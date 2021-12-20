import {
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Link,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import FormInput from "../components/FormInput";
import LoginFormWrapper from "../components/LoginFormWrapper";
import { useRegisterMutation } from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import NextLink from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

const Register: React.FC = () => {
  const router = useRouter();
  const intl = useIntl();
  const [register] = useRegisterMutation();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await register({ variables: values });
        if (response.data?.register.errors) {
          setErrors(mapErrors(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {(props) => (
        <LoginFormWrapper>
          <Form>
            <Heading mb={4} as="h4" size="md">
              <FormattedMessage id="Register.sign-up" />
            </Heading>
            <FormInput
              name="firstName"
              label={intl.formatMessage({
                id: "Register.first-name",
              })}
              placeholder={intl.formatMessage({
                id: "Register.first-name-placeholder",
              })}
            />
            <FormInput
              name="lastName"
              label={intl.formatMessage({
                id: "Register.last-name",
              })}
              placeholder={intl.formatMessage({
                id: "Register.last-name-placeholder",
              })}
            />
            <FormControl
              my={2}
              mb={6}
              isInvalid={(props.errors.gender && props.touched.gender) || false}
            >
              <FormLabel htmlFor="gender">
                <FormattedMessage id="Register.gender" />
              </FormLabel>
              <RadioGroup
                onChange={(e) =>
                  props.setValues({ ...props.values, gender: e })
                }
                value={props.values.gender}
                name="gender"
              >
                <Stack direction="row">
                  <Radio value={Gender.FEMALE}>
                    <FormattedMessage id="Register.female" />
                  </Radio>
                  <Radio value={Gender.MALE}>
                    <FormattedMessage id="Register.male" />
                  </Radio>
                  <Radio value={Gender.OTHER}>
                    <FormattedMessage id="Register.other" />
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{props.errors.gender}</FormErrorMessage>
            </FormControl>
            <Divider />
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
              <FormattedMessage id="Register.have-an-account" />
            </p>
            <NextLink href="/login">
              <Link color="teal.500">
                <FormattedMessage id="Register.sign-in" />
              </Link>
            </NextLink>
          </Container>
        </LoginFormWrapper>
      )}
    </Formik>
  );
};

export default Register;
