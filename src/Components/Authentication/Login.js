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

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pswdView, setPswdView] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);

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
      cookie.set("userInfo", data);
      //localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Verify the credentials!!",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      navigate("/");
      console.log(error);
      return;
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
        <Link m={3} pb={2} href="/reset">
          Forgot Password ?
        </Link>
      </FormControl>
      <Button
        width="60%"
        m={1}
        colorScheme="orange"
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign In
      </Button>
    </VStack>
  );
};

export default Login;
