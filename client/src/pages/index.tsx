import { Box } from "@chakra-ui/react";
import React from "react";
import TopBar from "../components/TopBar";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useMeQuery();
  return (
    <div>
      <TopBar />
      <Box m={4}>Hello {data?.me?.firstName}</Box>
    </div>
  );
};
export default Index;
