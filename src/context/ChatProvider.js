import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "../Components/Cookies";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userInfo = cookie.get("userInfo");
    const requestedPath = location.pathname;
    setUser(userInfo);
    if (!userInfo && requestedPath === "/reset") navigate("/reset");
    else if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <chatContext.Provider
      value={{ user, setUser, setSelectedChat, selectedChat, chats, setChats }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};
export default ChatProvider;
