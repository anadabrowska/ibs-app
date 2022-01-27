import React from "react";
import {
  Box,
  FormLabel,
  Select,
  HStack,
  Flex,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useRadioGroup,
  Button,
} from "@chakra-ui/react";
import { FormattedMessage, useIntl } from "react-intl";
import { moodOptions } from "../../utils/dailyFormUtils";
import RadioCard, { RadioType } from "../RadioCard";

export interface IActivity {
  id: number;
  name: string;
  moodAfter: number;
  duration: number;
  collapse?: boolean;
}

interface IActivityForm {
  activity: IActivity;
  setActivity: (value: IActivity) => void;
  removeActivity: (id: number) => void;
}

const ActivityForm: React.FC<IActivityForm> = ({
  activity,
  setActivity,
  removeActivity,
}: IActivityForm) => {
  React.useEffect(() => {
    setTimeout(() => setActivity({ ...activity, collapse: true }), 100);
  }, []);

  const intl = useIntl();

  //TODO: in the future create database for activites
  // with add your own option
  const activityNames = [
    "predefinedActivity.walking",
    "predefinedActivity.running",
    "predefinedActivity.cycling",
    "predefinedActivity.elliptical",
    "predefinedActivity.rower",
    "predefinedActivity.stair-stepper",
    "predefinedActivity.hiit-training",
    "predefinedActivity.hiking",
    "predefinedActivity.yoga",
    "predefinedActivity.functional-strength-training",
    "predefinedActivity.dance",
    "predefinedActivity.core-training",
    "predefinedActivity.pilates",
    "predefinedActivity.tai-chi",
    "predefinedActivity.swimming",
    "predefinedActivity.wheelchair",
    "predefinedActivity.other",
  ];

  const getMoodRadioProps = useRadioGroup({
    defaultValue:
      moodOptions.find((option) => option.rate === activity.moodAfter)?.title ||
      0,
    onChange: (value) =>
      setActivity({
        ...activity,
        moodAfter:
          moodOptions.find((option) => option.title === value)?.rate || 0,
      }),
  });

  return (
    <Box px={4} py={2} mb={4}>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setActivity({ ...activity, collapse: false });
            setTimeout(() => removeActivity(activity.id), 150);
          }}
        >
          <FormattedMessage id="general.remove" />
        </Button>
      </Box>
      <FormLabel>
        <FormattedMessage id="general.name" />
      </FormLabel>
      <Select
        onChange={(e) => setActivity({ ...activity, name: e.target.value })}
        mb={4}
        value={activity.name}
        placeholder={intl.formatMessage({
          id: "DailyForm.select-activity-placeholder",
        })}
      >
        {activityNames.map((name) => (
          <option
            key={intl.formatMessage({
              id: name,
            })}
            value={intl.formatMessage({
              id: name,
            })}
          >
            {intl.formatMessage({
              id: name,
            })}
          </option>
        ))}
      </Select>
      <FormLabel>
        <FormattedMessage id="DailyForm.mood-after" />
      </FormLabel>
      <HStack
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        {...getMoodRadioProps.getRootProps()}
      >
        {moodOptions.map((option) => {
          const radio = getMoodRadioProps.getRadioProps({
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
      <FormLabel>
        <FormattedMessage id="DailyForm.duration" />
      </FormLabel>
      <Flex mb="1rem">
        <Input
          maxW="70px"
          mr="2rem"
          value={activity.duration}
          onChange={(event) =>
            parseInt(event.target.value)
              ? setActivity({
                  ...activity,
                  duration: parseInt(event.target.value),
                })
              : setActivity({ ...activity, duration: 0 })
          }
          type="weight"
        />
        <Slider
          defaultValue={8}
          min={0}
          max={8}
          step={0.5}
          flex="1"
          focusThumbOnChange={false}
          value={activity.duration}
          onChange={(value) =>
            isNaN(value)
              ? setActivity({ ...activity, duration: 0 })
              : setActivity({ ...activity, duration: value })
          }
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            color="black"
            fontSize="sm"
            boxSize="32px"
            // eslint-disable-next-line react/no-children-prop
            children={activity.duration}
          />
        </Slider>
      </Flex>
    </Box>
  );
};

export default ActivityForm;
