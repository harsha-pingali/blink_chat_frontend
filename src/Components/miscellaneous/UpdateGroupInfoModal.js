import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Button,
  useDisclosure,
  Box,
  useToast,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";
import UserBadgeItem from "../Users/UserBadgeItem";
import UserListItem from "../Users/UserListItem";
const UpdateGroupInfoModal = ({ fetchAgian, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  //const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();
  const baseUrl = process.env.REACT_APP_API_URL;
  const handleRemove = async (userToBeRemoved) => {
    // if (
    //   selectedChat.groupAdmin._id !== user._id &&
    //   userToBeRemoved._id !== user._id
    // ) {
    //   toast({
    //     title: "Only admins can remove someone!",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
    // try {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   };
    //   const reqData = {
    //     chatId: selectedChat._id,
    //     userId: userToBeRemoved._id,
    //   };
    //   const { data } = await axios.put(
    //     `${baseUrl}/api/chat/groupremove`,
    //     reqData,
    //     config
    //   );
    //   userToBeRemoved._id === user._id
    //     ? setSelectedChat()
    //     : setSelectedChat(data);
    //   setFetchAgain(!fetchAgian);
    // } catch (error) {
    //   toast({
    //     title: "Error Occured!",
    //     description: error.response.data.message,
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    // }
    // setGroupChatName("");
  };
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const modedData = {
        chatId: selectedChat._id,
        newChatName: groupChatName, //careful with req data
      };
      /*   console.log(modedData);
      console.log(groupChatName + " is new Name");
      Purely For Debugging*/
      const { data } = await axios.put(
        `${baseUrl}/api/chat/rename`,
        modedData,
        config
      );
      console.log(data);
      setSelectedChat(data);
      setFetchAgain(!fetchAgian);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Failed to rename ",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearchKey(query);
    if (query === null) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/user?search=${query}`,
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
    setLoading(false);
  };
  const handleAddUser = async (userToBeAdded) => {
    if (selectedChat.users.find((u) => u._id === userToBeAdded._id)) {
      toast({
        title: `${userToBeAdded.name} is already a part of ${selectedChat.chatName}`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "only admins can add new users",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      console.log(selectedChat._id);
      console.log(userToBeAdded._id);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const newUser = {
        chatId: selectedChat._id,
        userId: userToBeAdded._id,
      };
      const { data } = await axios.put(
        `${baseUrl}/api/chat/groupadd`,
        newUser,
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgian);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `Unable to add ${userToBeAdded.name}`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
    setSearchKey("");
    setSearchResult([]);
    setLoading(false);
  };
  return (
    <>
      <IconButton onClick={onOpen} icon={<ViewIcon />}></IconButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {selectedChat.users.map((item) => {
                return (
                  <UserBadgeItem
                    key={item._id}
                    user={item}
                    handleFunction={() => handleRemove(item)}
                  />
                );
              })}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Change Group Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add New Users"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.map((item) => {
                return (
                  <UserListItem
                    key={item._id}
                    user={item}
                    handleFunction={() => handleAddUser(item)}
                  />
                );
              })
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemove(user)}>
              Exit From Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupInfoModal;
