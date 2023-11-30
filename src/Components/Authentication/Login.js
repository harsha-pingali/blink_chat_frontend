import React from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pswdView, setPswdView] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_API_URL);
  const apiUrl = process.env.REACT_APP_API_URL;

  async function submitHandler() {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Enter All Fields !",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/api/user/login`,
        { email, password },
        config
      );

      toast({
        title: "Login Success",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
      setLoading(false);
    }
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

      <FormControl id="password" isRequired m={3}>
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
      </FormControl>
      <Button width="60%" m={1} colorScheme="orange" onClick={submitHandler}>
        Sign In
      </Button>
    </VStack>
  );
};

export default Login;
