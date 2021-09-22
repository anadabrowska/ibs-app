import { Button, Container, Heading, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import FormInput from "../components/FormInput";
import FormWrapper from "../components/FormWrapper";
import { useRegisterMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import NextLink from "next/link";

const Register: React.FC = () => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register(values);
        console.log(response);

        if (response.data?.register.errors) {
          setErrors(mapErrors(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {(props) => (
        <FormWrapper>
          <Form>
            <Heading mb={4} as="h4" size="md">
              Sign up to IBS-App
            </Heading>
            <FormInput name="firstName" label="first name" placeholder="Ann" />
            <FormInput name="lastName" label="last name" placeholder="Smith" />
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
          <Container mt={4} textAlign="center">
            <p>Already have an account?</p>
            <NextLink href="/login">
              <Link color="teal.500">Sign in to an existing account</Link>
            </NextLink>
          </Container>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default Register;
