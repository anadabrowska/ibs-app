import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Collapse,
  Heading,
  Link,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import LoginFormWrapper from "../../components/LoginFormWrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import NextLink from "next/link";
import { mapErrors } from "../../utils/mapErrors";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [{}, changePassword] = useChangePasswordMutation();
  const { isOpen, onOpen } = useDisclosure();
  const [tokenErrorMessage, setTokenErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{ newPassword: "", confirmPassword: "" }}
      onSubmit={async (values, { setErrors }) => {
        if (values.newPassword !== values.confirmPassword) {
          setErrors({ confirmPassword: "passwords are not same" });
        } else {
          const response = await changePassword({
            newPassword: values.newPassword,
            token: token,
          });

          if (response.data?.changePassword.errors) {
            const errorMap = mapErrors(response.data.changePassword.errors);
            //TODO: deal with token errors
            if ("token" in errorMap) {
              setTokenErrorMessage(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            onOpen();
          }
        }
      }}
    >
      {(props) => (
        <LoginFormWrapper>
          <VStack>
            {tokenErrorMessage ? (
              <Alert
                status="error"
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
                  Invalid token
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  {tokenErrorMessage}
                </AlertDescription>
              </Alert>
            ) : null}
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
                  Password successfully changed!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Go to
                  {
                    <NextLink href="/login">
                      <Link color="teal.500"> sign in </Link>
                    </NextLink>
                  }
                  page to login to your account.
                </AlertDescription>
              </Alert>
            </Collapse>
            <Form>
              <Heading mb={4} as="h4" size="md">
                Change password
              </Heading>
              <FormInput
                name="newPassword"
                label="newPassword"
                placeholder="new password"
                type="password"
              />
              <FormInput
                name="confirmPassword"
                label="confirm password"
                placeholder="confirm password"
                type="password"
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Confirm
              </Button>
            </Form>
          </VStack>
        </LoginFormWrapper>
      )}
    </Formik>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
