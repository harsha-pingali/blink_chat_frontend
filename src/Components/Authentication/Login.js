import React from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pswdView, setPswdView] = useState(false);
  function submitHandler() {}
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
