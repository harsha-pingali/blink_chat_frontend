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
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider.js";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "../Users/UserListItem.js";
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
            {selectedUsers &&
              selectedUsers.map((item) => {
                return <UserListItem user={item} />;
              })}{" "}
            <Divider
              orientation="horizontal"
              variant={"solid"}
              colorScheme={"teal"}
            />
            {loading ? (
              <div>Loading ...</div>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
