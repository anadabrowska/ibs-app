import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface FormWrapperProps {}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        p={3}
        borderWidth={1}
        px={4}
        width="full"
        maxW="350px"
        borderRadius={3}
        textAlign="center"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default FormWrapper;
