import { Center, Spinner, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import Calendar from "../components/Calendar";
import SettingsPanel from "../components/SettingsPanel";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data } = useMeQuery();

  return (
    <Tabs variant="soft-rounded" colorScheme="teal">
      <TabPanels>
        <TabPanel>
          <Center m={4} mb={20}>
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
        </TabPanel>
        <TabPanel>
          <SettingsPanel />
        </TabPanel>
      </TabPanels>
      <BottomNavigation />
    </Tabs>
  );
};
export default Index;
