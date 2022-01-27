import { Stack, Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
import { FormattedMessage } from "react-intl";

const OfflineAlert: React.FC<{ fullData: boolean }> = (fullData) => {
  return (
    <Stack spacing={4} px={3} py={10}>
      <Alert status="info">
        <AlertIcon />
        <FormattedMessage
          id={
            fullData
              ? "OfflineAlert.data-missing"
              : "OfflineAlert.partial-data-missing"
          }
        />
      </Alert>
    </Stack>
  );
};

export default OfflineAlert;
