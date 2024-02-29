import React from "react";
import { Badge } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
const UserBadgeItem = (props) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="telegram"
      cursor="pointer"
      onClick={props.handleFunction}
      color={"white"}
    >
      {props.user.name}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
