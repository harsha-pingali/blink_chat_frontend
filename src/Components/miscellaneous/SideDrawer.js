import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Tooltip, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  return (
    <>
      <Box>
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <Search2Icon color="#2C7A7B"></Search2Icon>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;
