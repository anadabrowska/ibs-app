import { FormLabel } from "@chakra-ui/form-control";
import { Box, HStack } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useRadioGroup,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import RadioCard, { RadioType } from "../RadioCard";

export interface ISymptom {
  id: number;
  name: string;
  intensity: number;
  isDangerous: boolean;
  collapse?: boolean;
}

interface ISymptomForm {
  symptom: ISymptom;
  setSymptom: (value: ISymptom) => void;
  removeSymptom: (id: number) => void;
}

const SymptomForm: React.FC<ISymptomForm> = ({
  symptom,
  setSymptom,
  removeSymptom,
}: ISymptomForm) => {
  React.useEffect(() => {
    setTimeout(() => setSymptom({ ...symptom, collapse: true }), 100);
  }, []);

  const intl = useIntl();

  //TODO: in the future create database for symptoms
  // with add your own option
  const symptoms = [
    { name: "predefinedSymptom.flatulence", isDangerous: false },
    { name: "predefinedSymptom.gases", isDangerous: false },
    { name: "predefinedSymptom.diarrhea", isDangerous: false },
    { name: "predefinedSymptom.constipation", isDangerous: true },
    { name: "predefinedSymptom.heartburn", isDangerous: false },
    { name: "predefinedSymptom.reflux", isDangerous: false },
    { name: "predefinedSymptom.nausea", isDangerous: false },
    { name: "predefinedSymptom.mucus-in-the-stool", isDangerous: false },
    { name: "predefinedSymptom.incomplete-evacuation", isDangerous: false },
    { name: "predefinedSymptom.stomach-ache", isDangerous: false },

    { name: "predefinedSymptom.blood-in-the-stool", isDangerous: true },
    { name: "predefinedSymptom.symptoms-at-night", isDangerous: true },
  ];

  const getIntensityRadioProps = useRadioGroup({
    defaultValue: symptom.intensity.toString(),
    onChange: (value) =>
      setSymptom({
        ...symptom,
        intensity: parseInt(value),
      }),
  });

  const dangerousPopover = (
    <Popover>
      <PopoverTrigger>
        <Box as="button">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <FormattedMessage id="DailyForm.popover.dangerous-symptom" />
        </PopoverHeader>
        <PopoverBody>
          <FormattedMessage id="DailyForm.popover.dangerous-symptom-description" />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Box px={4} py={2} mb={4}>
      <Box
        display="flex"
        justifyContent={symptom.isDangerous ? "space-between" : "flex-end"}
      >
        {symptom.isDangerous ? dangerousPopover : null}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSymptom({ ...symptom, collapse: false });
            setTimeout(() => removeSymptom(symptom.id), 150);
          }}
        >
          <FormattedMessage id="general.remove" />
        </Button>
      </Box>
      <FormControl id={`symptom${symptom.id}.name`}>
        <FormLabel>
          <FormattedMessage id="general.name" />
        </FormLabel>

        <Select
          onChange={(e) => {
            setSymptom({
              ...symptom,
              name: e.target.value,
              isDangerous: e.target.value.includes(
                `[${intl.formatMessage({ id: "general.dangerous" })}]`
              ),
            });
          }}
          mb={4}
          value={symptom.name}
          placeholder={intl.formatMessage({
            id: "DailyForm.select-symptom-placeholder",
          })}
        >
          {symptoms.map((symptom) => (
            <option
              key={intl.formatMessage({
                id: symptom.name,
              })}
              value={`${intl.formatMessage({
                id: symptom.name,
              })} ${
                symptom.isDangerous
                  ? `[${intl.formatMessage({ id: "general.dangerous" })}]`
                  : ""
              }`}
            >
              {intl.formatMessage({
                id: symptom.name,
              })}
              {symptom.isDangerous
                ? ` [${intl.formatMessage({ id: "general.dangerous" })}]`
                : ""}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id={`symptom${symptom.id}.intensity`}>
        <FormLabel>
          <FormattedMessage id="DailyForm.intensity" />
        </FormLabel>
        <HStack
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          {...getIntensityRadioProps.getRootProps()}
        >
          {Array(5)
            .fill(0)
            .map((_, value) => {
              const radio = getIntensityRadioProps.getRadioProps({
                value: (value + 1).toString(),
              });
              return (
                <RadioCard
                  key={value}
                  radioType={RadioType.NumberRadio}
                  radioName="intensity"
                  {...radio}
                >
                  {value + 1}
                </RadioCard>
              );
            })}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default SymptomForm;
