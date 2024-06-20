import React from "react";
import { useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";
import { IoSend } from "react-icons/io5";
import {
  Box,
  Text,
  IconButton,
  Button,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import "./chatstyle.css";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getUserForChatBox } from "../config/ChatLogics";
import UserInfoModal from "../Users/UserInfoModal";
import UpdateGroupInfoModal from "../miscellaneous/UpdateGroupInfoModal";
import { useState } from "react";
import Lottie from "react-lottie";

//import { Axios } from "axios";
import { io } from "socket.io-client";
import ScrollableChat from "./ScrollableChat";
import animationData from "../../animations/typingTealNoBg.json";
var socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [showGroupInfoModal, setShowGroupInfoModal] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const baseUrl = process.env.REACT_APP_API_URL;

  const toast = useToast();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      // console.log(selectedChat);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
      console.log(data);
      // console.log(messages);
    } catch (error) {
      toast({
        title: "Failed to Load Messages",
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    socket = io(baseUrl, {
      withCredentials: true,
      path: "/socket",
      reconnection: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stoptyping", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //notificatons
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stoptyping", selectedChat?._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const reqData = {
          senderId: user._id,
          content: newMessage,
          chatId: selectedChat._id,
        };
        setNewMessage("");
        const { data } = await axios.post(
          `${baseUrl}/api/message`,
          reqData,
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Failed to send Message",
          status: "error",
          isClosable: true,
          position: "top-right",
          duration: 3000,
        });
      }
    }
  };

  const typingHandler = (e) => {
    e.stopPropagation();
    setNewMessage(e.target.value);
    //typing logic !!
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }

    let lastTypingTime = new Date().getTime();

    var timerLength = 3000;
    setTimeout(() => {
      var timerNow = new Date().getTime();
      var timeDiff = timerNow - timerLength;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stoptyping", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            color={"teal"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={(e) => {
                setSelectedChat("");
              }}
            ></IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Button
                  onClick={(e) => {
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    setShowUserInfoModal(true);
                  }}
                  icon={<ViewIcon />}
                >
                  <UserInfoModal
                    user={getUserForChatBox(user, selectedChat.users)}
                  />
                </Button>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <Button
                  onClick={(e) => {
                    console.log(e);
                    e.preventDefault();
                    e.stopPropagation();
                    setShowGroupInfoModal(true);
                  }}
                  icon={<ViewIcon />}
                >
                  <UpdateGroupInfoModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </Button>
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* msgs here */}
            {loading ? (
              <Spinner
                size={"xl"}
                alignSelf={"center"}
                emptyColor="gray.200"
                color="teal.500"
                speed="1s"
                margin={"auto"}
              />
            ) : (
              <div className="messages" style={{ maxWidth: "100%" }}>
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={100}
                    height={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <Input
                placeholder="Enter your message here..."
                variant={"filled"}
                bg={"#F0FFF4"}
                color={"black"}
                onChange={typingHandler}
                value={newMessage}
              />
              {/* <IoSend
                size={30}
                style={{ marginLeft: "0.9rem", marginTop: "0.25rem" }}
                onClick={(e) => sendMessage(e)}
              /> */}
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"} pb={3} color={"teal"}>
            Select an User to chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
