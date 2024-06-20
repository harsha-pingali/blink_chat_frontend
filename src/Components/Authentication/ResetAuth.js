import React from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon } from "@chakra-ui/icons";
import { Button, useToast, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "../Cookies";
import { useDisclosure } from "@chakra-ui/react";
import OtpModal from "../Users/OtpModal";

const ResetAuth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function submitHandler() {
    console.log("email :" + email);
    setLoading(true);
    if (!email) {
      toast({
        title: "Please Enter Email to get Code !",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    } else {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(
          `${apiUrl}/api/user/resetpass`,
          { email: email },
          config
        );
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setModalState(true);
      onOpen();
    }
    return;
  }
  return (
    <VStack spacing="5px" p={3}>
      <FormControl id="email" isRequired m={3}>
        <FormLabel color="white">Email</FormLabel>
        <Input
          placeholder="Enter Your Email-id"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      {/* <FormControl id="password" isRequired m={3}>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup>
          <Input
            type={pswdView ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement>
            <ViewIcon
              onClick={() => {
                if (pswdView === false) {
                  setPswdView(true);
                  //alert("Showing");
                } else {
                  setPswdView(false);
                  //alert("Hidden");
                }
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl> */}
      <Button
        width="60%"
        m={1}
        colorScheme="orange"
        onClick={submitHandler}
        isLoading={loading}
      >
        Submit
      </Button>
      <OtpModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ResetAuth;
