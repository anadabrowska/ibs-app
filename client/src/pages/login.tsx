import React from "react";
import { Form, Formik } from "formik";
import { Button, Heading } from "@chakra-ui/react";
import FormWrapper from "../components/FormWrapper";
import FormInput from "../components/FormInput";

const Login: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        console.log("soon will be sending values to the server ...");
        console.log(values);
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
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Login;
