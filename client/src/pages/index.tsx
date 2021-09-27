import { Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Calendar from "../components/Calendar";
import TopBar from "../components/TopBar";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useMeQuery();

  useEffect(() => {
    var scrollDiv = document?.getElementById("current")?.offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: "auto" });
  }, []);

  return (
    <div>
      <TopBar />
      <Box m={4}>Hello {data?.me?.firstName}</Box>
      <Center m={4}>
        <Calendar />
      </Center>
    </div>
  );
};
export default Index;
