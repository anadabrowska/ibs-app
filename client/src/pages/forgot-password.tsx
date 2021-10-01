import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Collapse,
  Heading,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import FormInput from "../components/FormInput";
import FormWrapper from "../components/FormWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";

const ForgotPassword = () => {
  const [{}, forgotPassword] = useForgotPasswordMutation();
  const { isOpen, onOpen } = useDisclosure();

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await forgotPassword(values);
        if (response.data?.forgotPassword.errors) {
          setErrors(mapErrors(response.data.forgotPassword.errors));
        } else if (response.data?.forgotPassword.success) {
          onOpen();
        }
      }}
    >
      {(props) => (
        <FormWrapper>
          <VStack>
            <Collapse in={isOpen} animateOpacity>
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius={5}
                mb={5}
              >
                <AlertIcon boxSize="30px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Request submitted!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Soon you should receive an email with a link that will allow
                  you to change the password.
                </AlertDescription>
              </Alert>
            </Collapse>
            <Form>
              <Heading mb={4} as="h4" size="md">
                Enter your email to change the password
              </Heading>
              <FormInput
                name="email"
                label="email"
                placeholder="test@example.com"
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </VStack>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default ForgotPassword;
