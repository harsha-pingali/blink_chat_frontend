import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { ViewIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "../Cookies";
const Signup = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [pswdView, setPswdView] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_API_URL;
  function postDetails(pics) {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select An Image",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "Blink-Chat");
        data.append("cloud_name", "dpkdi73b4");
        fetch("https://api.cloudinary.com/v1_1/dpkdi73b4/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setPic(data?.url.toString());
            console.log(data.url.toString());
            toast({
              title: "Uploaded Successfully",
              status: "success",
              duration: 4500,
              isClosable: true,
              position: "top",
            });
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else {
        toast({
          title: "Please Select An Image",
          status: "warning",
          duration: 4500,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
    }
  }
  async function submitHandler() {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Dosen't Match",
        status: "warning",
        duration: 4000,
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
        `${baseUrl}/api/user/`,
        { name, email, password, pic },
        config
      );
      cookie.set("userInfo", data);
      //localStorage.setItem("userInfo", JSON.stringify(data));
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
      <Button
        width="60%"
        m={1}
        colorScheme="orange"
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
