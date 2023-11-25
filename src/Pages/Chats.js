import React, { useEffect, useState } from "react";
import axios from "axios";

const Chats = () => {
  const [chats, setChats] = useState(null);
  const baseUrl = process.env.SERVER || "http://localhost:7071";
  const fetchChats = async () => {
    const { data } = await axios.get(`${baseUrl}/api/chats`);
    console.log(data);
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div style={{ backgroundColor: "green" }}>
      {Array.isArray(chats) &&
        chats.map((chat) => {
          return (
            <div key={chat._id}>
              <h3 style={{ color: "black" }}>{chat?.chatName}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
