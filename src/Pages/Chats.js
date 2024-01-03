import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../Components/miscellaneous/SideDrawer.js";
import MyChats from "../Components/Chat/MyChats.js";
import ChatBox from "../Components/Chat/ChatBox.js";
const Chats = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px",
          height: "95vh",
          width: "100%",
        }}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;
