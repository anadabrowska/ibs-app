import { FormLabel } from "@chakra-ui/form-control";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/layout";
import { IconButton, useRadioGroup } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import RadioCard, { RadioType } from "./RadioCard";

export interface ISymptom {
  id: number;
  name: string;
  intensity: number;
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
}: ISymptomForm) => {
  React.useEffect(() => {
    setTimeout(() => setSymptom({ ...symptom, collapse: true }), 100);
  }, []);

  //TODO: this should come from the database
  const symptoms = [
    { name: "stomachache", isDangerous: false },
    { name: "headache", isDangerous: false },
    { name: "nausea", isDangerous: false },
    { name: "dizziness", isDangerous: false },
  ];

  const getIntensityRadioProps = useRadioGroup({
    name: "mood after",
    onChange: (value) =>
      setSymptom({
        ...symptom,
        intensity: parseInt(value),
      }),
  });

  return (
    <Box px={4} py={2} mb={4}>
      <FormLabel>Name</FormLabel>
      <Grid templateColumns="repeat(6, 1fr)" gap={3}>
        <GridItem colSpan={5}>
          <Select
            onChange={(e) => setSymptom({ ...symptom, name: e.target.value })}
            mb={4}
            placeholder="Select symptom"
          >
            {symptoms.map((symptom) => (
              <option key={symptom.name} value={symptom.name}>
                {symptom.name}
                {symptom.isDangerous ? "[Dangerous]" : ""}
              </option>
            ))}
          </Select>
        </GridItem>
        <IconButton
          aria-label="Add symptom"
          fontSize="15px"
          icon={<FontAwesomeIcon icon="plus" />}
        />
      </Grid>
      <FormLabel>Intensity</FormLabel>
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
              <RadioCard radioType={RadioType.NumberRadio} {...radio}>
                {value + 1}
              </RadioCard>
            );
          })}
      </HStack>
    </Box>
  );
};

export default SymptomForm;
