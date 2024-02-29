import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider.js";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../Users/UserListItem.js";
import UserBadgeItem from "../Users/UserBadgeItem.js";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const base_url = process.env.REACT_APP_API_URL;
  const handleSearch = async (name) => {
    setSearchKey(name);
    if (name === null) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${base_url}/api/user?search=${name}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured !",
        description: "Failed To Search Results",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const handleGroup = (newUser) => {
    if (selectedUsers.includes(newUser)) {
      toast({
        title: "User Already Exists",
        status: "info",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, newUser]);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName) {
      toast({
        title: "Enter A Group Name",
        status: "info",
        duration: "3000",
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (selectedUsers.length === 0) {
      toast({
        title: "Select Users to create a group",
        status: "error",
        duration: 3500,
        position: "top-right",
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const groupData = {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      };
      console.log(`GroupData ${groupData}`);
      const { data } = await axios.post(
        `${base_url}/api/chat/group`,
        groupData,
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: `${groupChatName} created Successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setSelectedUsers([]);
      setGroupChatName(null);
      setSearchResult([]);
    } catch (error) {
      toast({
        title: "Failed To Create Group",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"30px"} d={"flex"} justifyContent={"center"}>
            Create New Group
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w={"100%"} d="flex" flexWrap={"wrap"}>
              {selectedUsers.map((item) => {
                return (
                  <UserBadgeItem
                    key={item._id}
                    user={item}
                    handleFunction={() => handleDelete(item)}
                  />
                );
              })}
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.slice(0, 4).map((item) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    handleFunction={() => handleGroup(item)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
