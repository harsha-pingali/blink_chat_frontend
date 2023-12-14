import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import {
  Tooltip,
  Button,
  Text,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { ChatState } from "../../context/ChatProvider";
import { useDisclosure } from "@chakra-ui/hooks";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const toast = useToast();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user?search=${search}`,
        config
      );
      console.log(data);
    } catch (error) {}
  };
  return (
    <>
      <Box
        // d="flex"
        // justifyContent="space-between"
        // alignItems="center"
        // bg="white"
        // p="5px 10px 5px 10px"
        // borderWidth="5px"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          width: "100%",
          padding: "5 px 10 px 5px 10 px",
          borderWidth: "5px",
        }}
      >
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Search2Icon color="#2C7A7B"></Search2Icon>
            <Text d={{ base: "none", md: "flex" }} color="teal" px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" color="teal">
          Blink-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon color="teal" fontSize="2xl"></BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem color="#48BB78">
                Profile{" "}
                <FaRegUser style={{ marginLeft: "1.25rem" }}></FaRegUser>
              </MenuItem>
              <MenuDivider></MenuDivider>
              <MenuItem color="#48BB78" onClick={handleLogout}>
                Log Out
                <TbLogout2 style={{ marginLeft: "1.2rem" }}></TbLogout2>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

          <DrawerBody>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "2rem",
              }}
            >
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              <Button onClick={handleSearch}>GO</Button>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
