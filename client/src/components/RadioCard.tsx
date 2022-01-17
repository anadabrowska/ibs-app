import { Box, Circle, useRadio, UseRadioProps, VStack } from "@chakra-ui/react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormattedMessage } from "react-intl";

export enum RadioType {
  IconRadio,
  NumberRadio,
}

type RadioCardProps = UseRadioProps & {
  radioType: RadioType;
  rate?: number;
  title?: string;
  radioName: string;
  icon?: IconName;
  onBlur?: (e: React.FocusEvent<any>) => void;
};

const RadioCard: React.FC<RadioCardProps> = (props) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input
        {...input}
        onFocus={(e) => {
          props.onBlur
            ? props.onBlur({
                ...e,
                target: {
                  ...e.target,
                  id: props.radioName,
                },
              })
            : null;
        }}
      />
      {props.radioType === RadioType.IconRadio && (
        <VStack
          {...checkbox}
          cursor="pointer"
          // px={[1, 2, 3]}
          py={2}
          display="flex"
          alignItems="center"
        >
          <FontAwesomeIcon
            icon={[state.isChecked ? "fas" : "far", props.icon || "coffee"]}
            color={state.isChecked ? "teal" : "gray"}
            size={state.isChecked ? "3x" : "2x"}
          />
          <Box
            fontSize={10}
            textAlign="center"
            color={state.isChecked ? "teal" : undefined}
          >
            <FormattedMessage id={props.title} />
          </Box>
        </VStack>
      )}
      {props.radioType === RadioType.NumberRadio && (
        <Circle
          {...checkbox}
          cursor="pointer"
          size={state.isChecked ? "50px" : "40px"}
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          // px={2}
          py={2}
          borderWidth={2}
        >
          {props.children}
        </Circle>
      )}
    </Box>
  );
};

export default RadioCard;
