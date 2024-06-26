import React from "react";
import { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ResetAuth from "../Components/Authentication/ResetAuth";
const Reset = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"#00122a"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1.2px"
      >
        <Text fontSize="2xl" style={{ textAlign: "center" }} color="whitesmoke">
          Blink-Chat
        </Text>
      </Box>
      <Box bg="#00122a" w="100%" p={4} borderRadius="lg" borderWidth="1.2px">
        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1em">
            <Tab width="100%">Reset Your Password !</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ResetAuth />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Reset;
