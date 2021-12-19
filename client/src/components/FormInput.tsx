import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";

type FieldProps = FieldHookConfig<string> & {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

const FormInput: React.FC<FieldProps> = (props) => {
  const [field, meta] = useField(props);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl my={2} isInvalid={(meta.error && meta.touched) || false}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          id={field.name}
          type={show || props.type !== "password" ? "text" : "password"}
          placeholder={props.placeholder}
        />
        {props.type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              <FormattedMessage id={show ? "Password.show" : "Password.hide"} />
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
