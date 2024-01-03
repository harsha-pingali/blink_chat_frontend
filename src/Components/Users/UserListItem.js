import React from "react";
import { Box, Avatar, Text } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
  //   const { user } = ChatState();
  return (
    <>
      <Box
        onClick={handleFunction}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "0.5rem",
        }}
        borderRadius="lg"
        px={2}
        py={2}
        w={"100%"}
        alignItems={"center"}
        bg="#E8E8E8"
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
      >
        <Avatar
          mr={2}
          size={"md"}
          cursor={"pointer"}
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text fontSize={"md"}>{user.name}</Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
