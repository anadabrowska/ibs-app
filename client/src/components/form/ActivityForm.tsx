import {
  Box,
  FormLabel,
  Grid,
  GridItem,
  Select,
  IconButton,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { RadioOpiton } from "../../utils/dailyFormUtils";
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

  const moodOptions: RadioOpiton[] = [
    { title: "amazing", icon: "grin-stars", rate: 5 },
    { title: "good", icon: "grin", rate: 4 },
    { title: "ok", icon: "meh", rate: 3 },
    { title: "bad", icon: "frown-open", rate: 2 },
    { title: "terrible", icon: "grimace", rate: 1 },
  ];

  //TODO: this should come from the database
  const activityNames = ["swimming", "running", "dancing", "biking"];

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
      <Grid templateColumns="repeat(6, 1fr)" gap={3}>
        <GridItem colSpan={5}>
          <Select
            onChange={(e) => setActivity({ ...activity, name: e.target.value })}
            mb={4}
            value={activity.name}
            placeholder={intl.formatMessage({
              id: "DailyForm.select-activity-placeholder",
            })}
          >
            {activityNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </GridItem>
        <IconButton
          aria-label="Add activity"
          fontSize="15px"
          icon={<FontAwesomeIcon icon="plus" />}
        />
      </Grid>
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
            setActivity({ ...activity, duration: parseInt(event.target.value) })
          }
          type="weight"
        />
        <Slider
          defaultValue={8}
          min={0}
          max={24}
          step={0.5}
          flex="1"
          focusThumbOnChange={false}
          value={activity.duration}
          onChange={(value) => setActivity({ ...activity, duration: value })}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            color="black"
            fontSize="sm"
            boxSize="32px"
            children={activity.duration}
          />
        </Slider>
      </Flex>
    </Box>
  );
};

export default ActivityForm;
