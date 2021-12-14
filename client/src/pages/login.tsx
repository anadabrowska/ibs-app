import React from "react";
import { Form, Formik } from "formik";
import { Button, Container, Heading, Link } from "@chakra-ui/react";
import LoginFormWrapper from "../components/LoginFormWrapper";
import FormInput from "../components/FormInput";
import { useLoginMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

const Login: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();
  const [{}, login] = useLoginMutation();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await login(values);

        if (response.data?.login.errors) {
          setErrors(mapErrors(response.data.login.errors));
        } else if (response.data?.login.user) {
          router.push("/");
        }
      }}
    >
      {(props) => (
        <LoginFormWrapper>
          <Form>
            <Heading mb={4} as="h4" size="md">
              <FormattedMessage id="Login.sign-in" />
            </Heading>
            <FormInput
              name="email"
              label={intl.formatMessage({
                id: "Register.email",
              })}
              placeholder={intl.formatMessage({
                id: "Register.email-placeholder",
              })}
            />
            <FormInput
              name="password"
              label={intl.formatMessage({
                id: "Register.password",
              })}
              placeholder={intl.formatMessage({
                id: "Register.password-placeholder",
              })}
              type="password"
            />
            <Container textAlign="right">
              <NextLink href="/forgot-password">
                <Link color="teal.500">
                  <FormattedMessage id="Login.forgot-password" />
                </Link>
              </NextLink>
            </Container>
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
            <p>
              <FormattedMessage id="Login.new-to-ibs" />
            </p>
            <NextLink href="/register">
              <Link color="teal.500">
                <FormattedMessage id="Login.create-new-account" />
              </Link>
            </NextLink>
          </Container>
        </LoginFormWrapper>
      )}
    </Formik>
  );
};

export default Login;
