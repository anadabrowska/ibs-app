import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Flex,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Collapse,
  Divider,
  Button,
  Switch,
  Textarea,
  useRadioGroup,
  Popover,
  PopoverTrigger,
  Alert,
  useDisclosure,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  FormErrorMessage,
} from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { moodOptions, stressOptions } from "../../utils/dailyFormUtils";
import RadioCard, { RadioType } from "../RadioCard";
import ActivityForm, { IActivity } from "./ActivityForm";
import DailyFormWrapper from "./DailyFormWrapper";
import StoolTypePopoverContent from "./StoolTypePopoverContent";
import StoolTypeForm, { IStoolType } from "./StoolTypeForm";
import SymptomForm, { ISymptom } from "./SymptomForm";
import { FormikErrors, FormikTouched } from "formik";
import { FormInput } from "../../generated/graphql";

interface DailyFormProps {
  loading?: boolean;
  errors?: FormikErrors<FormInput>;
  touched?: FormikTouched<FormInput>;
  weight: number;
  dayRate: number;
  generalMood: number;
  stressLevel: number;
  sleepQuality: number;
  sleepDuration: number;
  migraine: boolean;
  inTherapy: boolean;
  pollakiuria: boolean;
  menstruation: boolean;
  notes: string;
  symptoms: ISymptom[];
  activities: IActivity[];
  stoolTypes: IStoolType[];

  setWeight: (value: number) => void;
  setDayRate: (value: number) => void;
  setGeneralMood: (value: number) => void;
  setStressLevel: (value: number) => void;
  setSleepQuality: (value: number) => void;
  setSleepDuration: (value: number) => void;
  setMigraine: (value: boolean) => void;
  setInTherapy: (value: boolean) => void;
  setPollakiuria: (value: boolean) => void;
  setMenstruation: (value: boolean) => void;
  setNotes: (value: string) => void;
  setSymptoms: (value: ISymptom[]) => void;
  setActivities: (value: IActivity[]) => void;
  setStoolTypes: (value: IStoolType[]) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
}

const DailyForm: React.FC<DailyFormProps> = ({
  errors,
  touched,
  weight,
  dayRate,
  generalMood,
  stressLevel,
  sleepQuality,
  sleepDuration,
  loading,
  migraine,
  inTherapy,
  pollakiuria,
  menstruation,
  notes,
  symptoms,
  activities,
  stoolTypes,
  setWeight,
  setDayRate,
  setGeneralMood,
  setStressLevel,
  setSleepQuality,
  setSleepDuration,
  setMigraine,
  setInTherapy,
  setPollakiuria,
  setMenstruation,
  setNotes,
  setSymptoms,
  setActivities,
  setStoolTypes,
  onSubmit,
  onBlur,
}) => {
  useEffect(() => {
    symptoms.find((symptom) => symptom.isDangerous) ? onOpen() : onClose();
  }, [symptoms]);
  const intl = useIntl();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSleepQualityRadioProps = useRadioGroup({
    value: sleepQuality.toString(),
    onChange: (value) => setSleepQuality(parseInt(value)),
  });

  const getMoodRadioProps = useRadioGroup({
    value: moodOptions.find((option) => option.rate === generalMood)?.title,
    onChange: (value) =>
      setGeneralMood(
        moodOptions.find((option) => option.title === value)?.rate || 0
      ),
  });

  const getStressRadioProps = useRadioGroup({
    value: stressOptions.find((option) => option.rate === stressLevel)?.title,
    onChange: (value) =>
      setStressLevel(
        stressOptions.find((option) => option.title === value)?.rate || 0
      ),
  });

  const handleAddStoolType = (type?: number) => {
    //TODO: think about using uuid here later
    const id =
      stoolTypes.length > 0 ? stoolTypes[stoolTypes.length - 1].id + 1 : 0;
    const newStoolType: IStoolType = { id, type: type || 0, collapse: true };
    setStoolTypes([...stoolTypes, newStoolType]);
  };

  const handleSetStoolType = (value: IStoolType) => {
    setStoolTypes(
      stoolTypes.map((type) => (type.id === value.id ? value : type))
    );
  };

  const handleRemoveStoolType = (id: number) => {
    setStoolTypes(stoolTypes.filter((type) => type.id !== id));
  };

  const handleSetActivity = (value: IActivity) => {
    setActivities(
      activities.map((activity) =>
        activity.id === value.id ? value : activity
      )
    );
  };

  const handleAddActivity = (
    duration?: number,
    moodAfter?: number,
    name?: string
  ) => {
    //TODO: think about using uuid here later
    const id =
      activities.length > 0 ? activities[activities.length - 1].id + 1 : 0;
    const newActivity: IActivity = {
      id,
      duration: duration || 0,
      moodAfter: moodAfter || 0,
      name: name || "",
    };
    setActivities([...activities, newActivity]);
  };
  const handleRemoveActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const handleSetSymptom = (value: ISymptom) => {
    setSymptoms(
      symptoms.map((symptom) => (symptom.id === value.id ? value : symptom))
    );
  };

  const handleAddSymptom = (name?: string, intensity?: number) => {
    //TODO: think about using uuid here later
    const id = symptoms.length > 0 ? symptoms[symptoms.length - 1].id + 1 : 0;
    const newSymptom: ISymptom = {
      id,
      name: name || "",
      isDangerous: false,
      intensity: intensity || 0,
    };
    setSymptoms([...symptoms, newSymptom]);
  };
  const handleRemoveSymptom = (id: number) => {
    setSymptoms(symptoms.filter((symptom) => symptom.id !== id));
  };

  const getDayRateRadioProps = useRadioGroup({
    value: dayRate?.toString(),
    onChange: (value) => setDayRate(parseInt(value)),
  });
  return (
    <DailyFormWrapper>
      <Stack spacing={4} px={3} pt={10}>
        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="generalMood"
            isInvalid={(errors?.mood && touched?.mood) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.general-mood-label" />
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
                    onBlur={onBlur}
                    radioName="mood"
                    {...radio}
                  >
                    {option}
                  </RadioCard>
                );
              })}
            </HStack>
            <FormErrorMessage>{errors?.mood}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
          <FormControl
            id="weight"
            isInvalid={(errors?.weight && touched?.weight) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.weight" />
            </FormLabel>
            <Flex>
              <Input
                maxW="60px"
                mr="2rem"
                value={weight}
                onChange={(event) => setWeight(parseInt(event.target.value))}
                onBlur={onBlur}
                type="weight"
              />
              <Slider
                defaultValue={50}
                min={20}
                max={150}
                flex="1"
                className="weight"
                value={weight}
                onChange={(value) => setWeight(value)}
                onFocus={(e) => {
                  onBlur({
                    ...e,
                    target: {
                      ...e.target,
                      id: "weight",
                    },
                  });
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  color="black"
                  fontSize="sm"
                  boxSize="32px"
                  children={weight}
                />
              </Slider>
            </Flex>
            <FormErrorMessage>{errors?.weight}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
          <FormControl id="symptoms">
            <FormLabel>
              <FormattedMessage id="DailyForm.symptoms" />
            </FormLabel>
            <Collapse in={isOpen} animateOpacity>
              <Alert
                status="warning"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius={5}
                mb={5}
              >
                <AlertIcon boxSize="20px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  <FormattedMessage id="DailyForm.alert.dangerous-symptom" />
                </AlertTitle>
                <AlertDescription maxWidth="280px">
                  <FormattedMessage id="DailyForm.alert.dangerous-symptom-description" />
                </AlertDescription>
              </Alert>
            </Collapse>
            {symptoms.map((symptom, index) => (
              <Collapse
                key={symptom.id}
                startingHeight={0}
                in={symptom.collapse}
              >
                {index > 0 && <Divider mb={3} />}
                <SymptomForm
                  symptom={symptom}
                  removeSymptom={handleRemoveSymptom}
                  setSymptom={handleSetSymptom}
                />
              </Collapse>
            ))}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={() => handleAddSymptom()}
                leftIcon={<FontAwesomeIcon icon="plus" />}
                variant="outline"
              >
                <FormattedMessage id="DailyForm.add-symptom-button" />
              </Button>
            </Box>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="sleepLenght"
            isInvalid={(errors?.sleepLenght && touched?.sleepLenght) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.sleep" />
            </FormLabel>
            <FormLabel>
              <FormattedMessage id="DailyForm.duration" />
            </FormLabel>
            <Flex mb="1rem">
              <Input
                maxW="70px"
                mr="2rem"
                value={sleepDuration}
                onBlur={onBlur}
                onChange={(event) =>
                  setSleepDuration(parseInt(event.target.value))
                }
                type="sleepLenght"
              />
              <Slider
                defaultValue={8}
                min={0}
                max={24}
                step={0.5}
                flex="1"
                value={sleepDuration}
                onChange={(value) => setSleepDuration(value)}
                onFocus={(e) => {
                  onBlur({
                    ...e,
                    target: {
                      ...e.target,
                      id: "sleepLenght",
                    },
                  });
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb
                  color="black"
                  fontSize="sm"
                  boxSize="32px"
                  children={sleepDuration}
                />
              </Slider>
            </Flex>
            <FormErrorMessage>{errors?.sleepLenght}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="sleepQuality"
            isInvalid={(errors?.sleepQuality && touched?.sleepQuality) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.quality" />
            </FormLabel>
            <HStack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              {...getSleepQualityRadioProps.getRootProps()}
            >
              {Array(5)
                .fill(0)
                .map((_, value) => {
                  const radio = getSleepQualityRadioProps.getRadioProps({
                    value: (value + 1).toString(),
                  });
                  return (
                    <RadioCard
                      key={value}
                      radioType={RadioType.NumberRadio}
                      onBlur={onBlur}
                      radioName="sleepQuality"
                      {...radio}
                    >
                      {value + 1}
                    </RadioCard>
                  );
                })}
            </HStack>
            <FormErrorMessage>{errors?.sleepQuality}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="stress"
            isInvalid={(errors?.stressLevel && touched?.stressLevel) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.stress" />
            </FormLabel>
            <HStack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              {...getStressRadioProps.getRootProps()}
            >
              {stressOptions.map((option) => {
                const radio = getStressRadioProps.getRadioProps({
                  value: option.title,
                });
                return (
                  <RadioCard
                    key={option.rate}
                    radioType={RadioType.IconRadio}
                    icon={option.icon}
                    title={option.title}
                    onBlur={onBlur}
                    radioName="stressLevel"
                    {...radio}
                  >
                    {option}
                  </RadioCard>
                );
              })}
            </HStack>
            <FormErrorMessage>{errors?.stressLevel}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
          <FormControl id="symptoms">
            <FormLabel>
              <FormattedMessage id="DailyForm.activities" />
            </FormLabel>
            {activities.map((activity, index) => (
              <Collapse
                key={activity.id}
                startingHeight={0}
                in={activity.collapse}
              >
                {index > 0 && <Divider mb={3} />}
                <ActivityForm
                  activity={activity}
                  setActivity={handleSetActivity}
                  removeActivity={handleRemoveActivity}
                />
              </Collapse>
            ))}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={() => handleAddActivity()}
                leftIcon={<FontAwesomeIcon icon="plus" />}
                variant="outline"
              >
                <FormattedMessage id="DailyForm.add-activity-button" />
              </Button>
            </Box>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl id="stool-type">
            <FormLabel>
              <FormattedMessage id="DailyForm.stool-type-label" />{" "}
              <Popover>
                <PopoverTrigger>
                  <Box as="button">
                    <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
                  </Box>
                </PopoverTrigger>
                <StoolTypePopoverContent />
              </Popover>
            </FormLabel>
            {stoolTypes.map((type, index) => (
              <Collapse
                onBlur={onBlur}
                key={type.id}
                startingHeight={0}
                in={type.collapse}
              >
                {index > 0 && <Divider mb={3} />}
                <StoolTypeForm
                  stoolType={type}
                  removeStoolType={handleRemoveStoolType}
                  setStoolType={handleSetStoolType}
                  onBlur={onBlur}
                />
              </Collapse>
            ))}
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={() => handleAddStoolType()}
                leftIcon={<FontAwesomeIcon icon="plus" />}
                variant="outline"
              >
                <FormattedMessage id="DailyForm.add-stool-type-button" />
              </Button>
            </Box>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="therapy">
              <FormattedMessage id="DailyForm.in-therapy" />
            </FormLabel>
            <Switch
              onChange={(e) => setInTherapy(e.target.checked)}
              isChecked={inTherapy}
              mb={4}
              id="therapy"
              size="lg"
            />
          </FormControl>
          {/* TODO: only for women  */}
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="menstruation">
              <FormattedMessage id="DailyForm.menstruation" />
            </FormLabel>
            <Switch
              onChange={(e) => setMenstruation(e.target.checked)}
              isChecked={menstruation || false}
              mb={4}
              id="menstruation"
              size="lg"
            />
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="migraine">
              <FormattedMessage id="DailyForm.migraine" />
            </FormLabel>
            <Switch
              onChange={(e) => setMigraine(e.target.checked)}
              isChecked={migraine}
              mb={4}
              id="migraine"
              size="lg"
            />
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel htmlFor="pollakiuria">
              <FormattedMessage id="DailyForm.pollakiuria" />
            </FormLabel>
            <Switch
              onChange={(e) => setPollakiuria(e.target.checked)}
              isChecked={pollakiuria}
              id="pollakiuria"
              size="lg"
            />
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="dayRate"
            isInvalid={(errors?.dayRate && touched?.dayRate) || false}
          >
            <FormLabel>
              <FormattedMessage id="DailyForm.general-day-rate" />
            </FormLabel>
            <HStack
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              {...getDayRateRadioProps.getRootProps()}
            >
              {Array(5)
                .fill(0)
                .map((_, value) => {
                  const radio = getDayRateRadioProps.getRadioProps({
                    value: (value + 1).toString(),
                  });
                  return (
                    <RadioCard
                      key={value}
                      radioType={RadioType.NumberRadio}
                      onBlur={onBlur}
                      radioName="dayRate"
                      {...radio}
                    >
                      {value + 1}
                    </RadioCard>
                  );
                })}
            </HStack>
            <FormErrorMessage>{errors?.dayRate}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
          <FormControl id="email">
            <FormLabel>
              <FormattedMessage id="DailyForm.notes" />
            </FormLabel>
            <Textarea
              onChange={(e) => setNotes(e.target.value)}
              value={notes || ""}
              placeholder={intl.formatMessage({
                id: "DailyForm.notes-placeholder",
              })}
            />
          </FormControl>
        </Box>

        <Button
          mt={4}
          colorScheme="teal"
          onClick={onSubmit as any}
          isLoading={loading}
          type="submit"
        >
          <FormattedMessage id="general.submit" />
        </Button>
      </Stack>
    </DailyFormWrapper>
  );
};

export default DailyForm;
