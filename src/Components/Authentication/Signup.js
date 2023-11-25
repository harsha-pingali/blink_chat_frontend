import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [pswdView, setPswdView] = useState(false);

  function postDetails(pics) {}
  function submitHandler() {}
  return (
    <VStack spacing="5px" p={3}>
      <FormControl id="fname" isRequired m={3}>
        <FormLabel color="white">Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired m={3}>
        <FormLabel color="white">Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
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

      <FormControl id="password2" isRequired m={3}>
        <FormLabel color="white">Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={pswdView ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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

      <FormControl id="pic" m={3}>
        <FormLabel color="white">Upload Your Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          p={1.5}
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button width="60%" m={1} colorScheme="orange" onClick={submitHandler}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
