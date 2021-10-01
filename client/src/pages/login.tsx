import React from "react";
import { Form, Formik } from "formik";
import { Button, Container, Heading, Link } from "@chakra-ui/react";
import FormWrapper from "../components/FormWrapper";
import FormInput from "../components/FormInput";
import { useLoginMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";

const Login: React.FC = () => {
  const router = useRouter();
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
        <FormWrapper>
          <Form>
            <Heading mb={4} as="h4" size="md">
              Sign in to your acconut
            </Heading>
            <FormInput
              name="email"
              label="email"
              placeholder="test@example.com"
            />
            <FormInput
              name="password"
              label="password"
              placeholder="password"
              type="password"
            />
            <Container textAlign="right">
              <NextLink href="/forgot-password">
                <Link color="teal.500">Forgot password?</Link>
              </NextLink>
            </Container>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
          <Container mt={4} textAlign="center">
            <p>New to IBS-App?</p>
            <NextLink href="/register">
              <Link color="teal.500">Create new account</Link>
            </NextLink>
          </Container>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
