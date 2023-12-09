import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Tooltip, Button, Text, Avatar } from "@chakra-ui/react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { ChatState } from "../../context/ChatProvider";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
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
          <Button variant="ghost">
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
    </>
  );
};

export default SideDrawer;
