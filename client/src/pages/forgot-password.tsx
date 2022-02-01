import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Collapse,
  Container,
  Heading,
  Link,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import FormInput from "../components/FormInput";
import LoginFormWrapper from "../components/LoginFormWrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import NextLink from "next/link";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const { isOpen, onOpen } = useDisclosure();
  const intl = useIntl();

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await forgotPassword({ variables: values });
        if (response.data?.forgotPassword.errors) {
          setErrors(mapErrors(response.data.forgotPassword.errors, intl));
        } else if (response.data?.forgotPassword.success) {
          onOpen();
        }
      }}
    >
      {(props) => (
        <LoginFormWrapper>
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
                  <FormattedMessage id="ForgotPassword.submitted" />
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  <FormattedMessage id="ForgotPassword.submitted-description" />
                </AlertDescription>
              </Alert>
            </Collapse>
            <Form>
              <Heading mb={4} as="h4" size="md">
                <FormattedMessage id="ForgotPassword.header" />
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
                <FormattedMessage id="general.submit" />
              </Button>
            </Form>
            <Container mt={4} textAlign="center">
              <NextLink href="/login">
                <Link color="teal.500">
                  <FormattedMessage id="ForgotPassword.back-to-login" />
                </Link>
              </NextLink>
            </Container>
          </VStack>
        </LoginFormWrapper>
      )}
    </Formik>
  );
};

export default ForgotPassword;
