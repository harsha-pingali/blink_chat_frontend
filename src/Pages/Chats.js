import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../Components/miscellaneous/SideDrawer.js";
import MyChats from "../Components/Chat/MyChats.js";
import ChatBox from "../Components/Chat/ChatBox.js";
const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
