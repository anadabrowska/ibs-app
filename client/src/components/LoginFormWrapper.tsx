import { Box, Center } from "@chakra-ui/react";
import React from "react";

interface LoginFormWrapperProps {}

const LoginFormWrapper: React.FC<LoginFormWrapperProps> = ({ children }) => {
  return (
    <Center minHeight="100vh">
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
    </Center>
  );
};

export default LoginFormWrapper;
