import React from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const OtpModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Your OTP</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack display={"flex"} flexDir={"row"} alignItems={"center"}>
            <PinInput size="lg">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme="blue">Validate</Button>
            <Link>Resend Otp</Link>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OtpModal;
