import { Center, Spinner, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import Calendar from "../components/Calendar";
import ClosedExperiments from "../components/ClosedExperiments";
import OpenExperiments from "../components/OpenExperiments";
import SettingsPanel from "../components/settings-panel/SettingsPanel";
import { useMeQuery } from "../generated/graphql";

const Index = () => {
  const { data } = useMeQuery({
    fetchPolicy: "cache-and-network",
  });
  const [tabIndex, setTabIndex] = React.useState(0);
  const router = useRouter();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const tabNames: { [key: string]: number } = {
    calendar: 0,
    "open-experiments": 1,
    "closed-experiments": 2,
    settings: 3,
  };

  useEffect(() => {
    if (router.query.tabName)
      setTabIndex(tabNames[router.query.tabName as string]);
  }, []);

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="teal"
      index={tabIndex}
      onChange={handleTabsChange}
    >
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
              <Calendar active={tabIndex == 0} />
            )}
          </Center>
        </TabPanel>
        <TabPanel>
          <OpenExperiments />
        </TabPanel>
        <TabPanel>
          <ClosedExperiments />
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
