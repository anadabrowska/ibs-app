import {
  Box,
  Text,
  FormLabel,
  Input,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { moodOptions } from "../../utils/dailyFormUtils";
import RadioCard, { RadioType } from "../RadioCard";

export interface IExperiment {
  id: number;
  experimentId: number;
  productName: string;
  quantity: string;
  generalSensation: number;
}

interface IExperimentForm {
  experiment: IExperiment;
  setExperiment: (value: IExperiment) => void;
}

const ExperimentFrom: React.FC<IExperimentForm> = ({
  experiment,
  setExperiment,
}: IExperimentForm) => {
  const intl = useIntl();

  const getGeneralSensationRadioProps = useRadioGroup({
    value: moodOptions.find(
      (option) => option.rate === experiment.generalSensation
    )?.title,
    onChange: (value) =>
      setExperiment({
        ...experiment,
        generalSensation:
          moodOptions.find((option) => option.title === value)?.rate || 0,
      }),
  });

  return (
    <Box px={4} py={2} mb={4}>
      <Text textAlign={"center"} fontSize="lg" my={3}>
        {experiment.productName}
      </Text>
      <FormLabel>
        <FormattedMessage id="DailyForm.quantity" />
      </FormLabel>
      <Input
        value={experiment.quantity}
        onChange={(e) =>
          setExperiment({ ...experiment, quantity: e.target.value })
        }
        placeholder={intl.formatMessage({
          id: "DailyForm.quantity-placeholder",
        })}
      />
      <FormLabel mt={3}>
        <FormattedMessage id="DailyForm.general-sensation" />
      </FormLabel>
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        {...getGeneralSensationRadioProps.getRootProps()}
      >
        {moodOptions.map((option) => {
          const radio = getGeneralSensationRadioProps.getRadioProps({
            value: option.title,
          });
          return (
            <RadioCard
              key={option.rate}
              radioType={RadioType.IconRadio}
              icon={option.icon}
              title={option.title}
              rate={option.rate}
              radioName="moodAfter"
              {...radio}
            >
              {option}
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
};

export default ExperimentFrom;
