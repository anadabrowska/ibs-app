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
import { FormInput, useMeQuery } from "../../generated/graphql";
import ExperimentFrom, { IExperiment } from "./ExperimentFrom";
import { Gender } from "../../pages/register";

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
  experiments: IExperiment[];

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
  setExperiments: (value: IExperiment[]) => void;
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
  experiments,
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
  setExperiments,
  onSubmit,
  onBlur,
}) => {
  useEffect(() => {
    symptoms.find((symptom) => symptom.isDangerous) ? onOpen() : onClose();
  }, [symptoms]);
  const intl = useIntl();
  const meQuery = useMeQuery({
    fetchPolicy: "cache-and-network",
  });

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

  const handleSetExperiment = (value: IExperiment) => {
    setExperiments(
      experiments.map((experiment) =>
        experiment.id === value.id ? value : experiment
      )
    );
  };

  const handleAddStoolType = (type?: number) => {
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
      <Stack spacing={4} px={{ base: 0, mobileS: 2, mobile: 4 }} pt={10}>
        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="generalMood"
            isInvalid={(errors?.mood && touched?.mood) || false}
          >
            <FormLabel fontWeight="bold" fontSize="lg">
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

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="weight"
            isInvalid={(errors?.weight && touched?.weight) || false}
          >
            <FormLabel fontWeight="bold" fontSize="lg" mb={5}>
              <FormattedMessage id="DailyForm.weight" />
            </FormLabel>
            <Flex>
              <Input
                maxW="60px"
                mr="2rem"
                value={weight}
                onChange={(event) =>
                  parseInt(event.target.value)
                    ? setWeight(parseInt(event.target.value))
                    : setWeight(0)
                }
                onBlur={onBlur}
                type="weight"
              />
              <Slider
                defaultValue={50}
                min={20}
                max={140}
                flex="1"
                className="weight"
                value={weight}
                onChange={(value) =>
                  isNaN(value) ? setWeight(0) : setWeight(value)
                }
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
                  // eslint-disable-next-line react/no-children-prop
                  children={weight}
                />
              </Slider>
            </Flex>
            <FormErrorMessage>{errors?.weight}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormLabel fontWeight="bold" fontSize="lg">
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
            <Collapse key={symptom.id} startingHeight={0} in={symptom.collapse}>
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
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormLabel fontWeight="bold" fontSize="lg" mb={5}>
            <FormattedMessage id="DailyForm.sleep" />
          </FormLabel>
          <FormControl
            id="sleepLenght"
            isInvalid={(errors?.sleepLenght && touched?.sleepLenght) || false}
          >
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
                  parseInt(event.target.value)
                    ? setSleepDuration(parseInt(event.target.value))
                    : setSleepDuration(0)
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
                onChange={(value) =>
                  isNaN(value) ? setSleepDuration(0) : setSleepDuration(value)
                }
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
                  // eslint-disable-next-line react/no-children-prop
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
            <FormLabel fontWeight="bold" fontSize="lg">
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

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl id="symptoms">
            <FormLabel fontWeight="bold" fontSize="lg">
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
            <FormLabel fontWeight="bold" fontSize="lg">
              <FormattedMessage id="DailyForm.stool-type-label" />{" "}
              <Popover>
                <PopoverTrigger>
                  <Box
                    as="button"
                    role="button"
                    aria-label="stool type details"
                  >
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
        {experiments.length > 0 && (
          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormLabel fontWeight="bold" fontSize="lg">
              <FormattedMessage id="DailyForm.experiemnts" />
            </FormLabel>
            {experiments.map((experiment, index) => (
              <Box key={index}>
                {index > 0 && <Divider mb={3} />}
                <ExperimentFrom
                  experiment={experiment}
                  setExperiment={handleSetExperiment}
                />
              </Box>
            ))}
          </Box>
        )}
        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            id="therapy"
          >
            <FormLabel htmlFor="therapy">
              <FormattedMessage id="DailyForm.in-therapy" />
            </FormLabel>
            <Switch
              onChange={(e) => setInTherapy(e.target.checked)}
              isChecked={inTherapy}
              mb={4}
              size="lg"
            />
          </FormControl>
          {meQuery.data?.me?.gender === Gender.FEMALE && (
            <FormControl
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              id="menstruation"
            >
              <FormLabel htmlFor="menstruation">
                <FormattedMessage id="DailyForm.menstruation" />
              </FormLabel>
              <Switch
                onChange={(e) => setMenstruation(e.target.checked)}
                isChecked={menstruation || false}
                mb={4}
                size="lg"
              />
            </FormControl>
          )}
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            id="migraine"
          >
            <FormLabel htmlFor="migraine">
              <FormattedMessage id="DailyForm.migraine" />
            </FormLabel>
            <Switch
              onChange={(e) => setMigraine(e.target.checked)}
              isChecked={migraine}
              mb={4}
              size="lg"
            />
          </FormControl>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormLabel id="pollakiuria">
              <FormattedMessage id="DailyForm.pollakiuria" />
            </FormLabel>
            <Switch
              onChange={(e) => setPollakiuria(e.target.checked)}
              isChecked={pollakiuria}
              size="lg"
            />
          </FormControl>
        </Box>

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl
            id="dayRate"
            isInvalid={(errors?.dayRate && touched?.dayRate) || false}
          >
            <FormLabel fontWeight="bold" fontSize="lg">
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

        <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
          <FormControl id="notes">
            <FormLabel fontWeight="bold" fontSize="lg" mb={5}>
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
          isLoading={loading && navigator.onLine}
          type="submit"
        >
          <FormattedMessage id="general.submit" />
        </Button>
      </Stack>
    </DailyFormWrapper>
  );
};

export default DailyForm;
