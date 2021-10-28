import { Box, Center, Spinner } from "@chakra-ui/react";
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
      <Center m={4}>
        {!data?.me ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Calendar />
        )}
      </Center>
    </div>
  );
};
export default Index;
