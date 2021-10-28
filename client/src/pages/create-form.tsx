import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/layout";
import {
  Button,
  Collapse,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Textarea,
  useRadioGroup,
} from "@chakra-ui/react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useState } from "react";
import ActivityForm, { IActivity } from "../components/ActivityForm";
import RadioCard, { RadioType } from "../components/RadioCard";
import SymptomForm, { ISymptom } from "../components/SymptomForm";
import { useCreateFormMutation } from "../generated/graphql";

export type RadioOpiton = {
  title: string;
  icon: IconName;
  rate: number;
};

const CreateForm: React.FC = () => {
  const [{ fetching }, createForm] = useCreateFormMutation();

  const [activities, setActivities] = useState<IActivity[]>([]);

  const handleSetActivity = (value: IActivity) => {
    setActivities(
      activities.map((activity) =>
        activity.id === value.id ? value : activity
      )
    );
  };
  const handleAddActivity = () => {
    //TODO: think about using uuid here later
    const id =
      activities.length > 0 ? activities[activities.length - 1].id + 1 : 0;
    const newActivity: IActivity = { id, duration: 0, moodAfter: 0, name: "" };
    setActivities([...activities, newActivity]);
  };
  const handleRemoveActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);

  const handleSetSymptom = (value: ISymptom) => {
    setSymptoms(
      symptoms.map((symptom) => (symptom.id === value.id ? value : symptom))
    );
  };

  const handleAddSymptom = () => {
    //TODO: think about using uuid here later
    const id = symptoms.length > 0 ? symptoms[symptoms.length - 1].id + 1 : 0;
    const newSymptom: ISymptom = { id, name: "", intensity: 0 };
    setSymptoms([...symptoms, newSymptom]);
  };
  const handleRemoveSymptom = (id: number) => {
    setSymptoms(symptoms.filter((symptom) => symptom.id !== id));
  };
  //TODO: default weight needs to come from the form from yesterday
  const [weight, setWeight] = useState(0);

  const [sleepDuration, setSleepDuration] = useState(8);
  const [sleepQuality, setSleepQuality] = useState(0);

  const getSleepQualityRadioProps = useRadioGroup({
    name: "sleep quality",
    onChange: (value) => setSleepQuality(parseInt(value)),
  });

  const [addBST, setAddBST] = useState(false);

  const moodOptions: RadioOpiton[] = [
    { title: "amazing", icon: "grin-stars", rate: 5 },
    { title: "good", icon: "grin", rate: 4 },
    { title: "ok", icon: "meh", rate: 3 },
    { title: "bad", icon: "frown-open", rate: 2 },
    { title: "terrible", icon: "grimace", rate: 1 },
  ];

  const [generalMood, setGeneralMood] = useState(0);

  const getMoodRadioProps = useRadioGroup({
    name: "general mood",
    onChange: (value) =>
      setGeneralMood(
        moodOptions.find((option) => option.title === value)?.rate || 0
      ),
  });

  const stressOptions: RadioOpiton[] = [
    { title: "not stressed", icon: "laugh-beam", rate: 1 },
    { title: "a bit stressed", icon: "meh-rolling-eyes", rate: 2 },
    { title: "stressed", icon: "meh", rate: 3 },
    { title: "very stressed", icon: "frown", rate: 4 },
    { title: "stress overload", icon: "sad-tear", rate: 5 },
  ];

  const [stressLevel, setStressLevel] = useState(0);

  const getStressRadioProps = useRadioGroup({
    name: "stress",
    onChange: (value) =>
      setStressLevel(
        stressOptions.find((option) => option.title === value)?.rate || 0
      ),
  });

  const [BST, setBST] = useState(0);

  const getBSTRadioProps = useRadioGroup({
    name: "BST",
    onChange: (value) => setBST(parseInt(value)),
  });

  const [dayRate, setDayRate] = useState(0);

  const getDayRateRadioProps = useRadioGroup({
    name: "day rate",
    onChange: (value) => setDayRate(parseInt(value)),
  });

  const [inTherapy, setInTherapy] = useState(false);
  const [menstruation, setMenstruation] = useState(false);
  const [migraine, setMigraine] = useState(false);
  const [pollakiuria, setPollakiuria] = useState(false);

  const [notes, setNotes] = useState("");
  const onSubmit = async () => {
    //TODO: ajust the names to be the same on client and server side
    const formState = {
      mood: generalMood,
      weight: weight,
      symptoms: symptoms.map((symptom) => {
        return { name: symptom.name, intensity: symptom.intensity };
      }),
      sleepLenght: sleepDuration,
      sleepQuality: sleepQuality,
      stress: stressLevel,
      activities: activities.map((activity) => {
        return {
          type: activity.name,
          moodAfter: activity.moodAfter,
          time: activity.duration,
        };
      }),
      stoolType: BST,
      inTherapy: inTherapy,
      menstruation: menstruation,
      migraine: migraine,
      pollakiuria: pollakiuria,
      generalFeeling: dayRate,
      notes: notes,
    };
    await createForm({ input: formState });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={[3, 6, 9]}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>How was your day?</Heading>
        </Stack>
        <Stack spacing={4}>
          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormControl id="generalMood">
              <FormLabel>General mood</FormLabel>
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
                      radioType={RadioType.IconRadio}
                      icon={option.icon}
                      title={option.title}
                      {...radio}
                    >
                      {option}
                    </RadioCard>
                  );
                })}
              </HStack>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
            <FormControl id="weight">
              <FormLabel>Weight</FormLabel>
              <Flex>
                <Input
                  maxW="60px"
                  mr="2rem"
                  value={weight}
                  onChange={(event) => setWeight(parseInt(event.target.value))}
                  type="weight"
                />
                <Slider
                  defaultValue={50}
                  min={20}
                  max={150}
                  flex="1"
                  focusThumbOnChange={false}
                  value={weight}
                  onChange={(value) => setWeight(value)}
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
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
            <FormControl id="symptoms">
              <FormLabel>Symptoms</FormLabel>
              {symptoms.map((symptom) => (
                <Collapse startingHeight={0} in={symptom.collapse}>
                  <SymptomForm
                    symptom={symptom}
                    removeSymptom={handleRemoveSymptom}
                    setSymptom={handleSetSymptom}
                  />
                </Collapse>
              ))}
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  onClick={handleAddSymptom}
                  leftIcon={<FontAwesomeIcon icon="plus" />}
                  variant="outline"
                >
                  Add symptom
                </Button>
              </Box>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormControl id="sleep">
              <FormLabel>Sleep</FormLabel>
              <FormLabel>Duration</FormLabel>
              <Flex mb="1rem">
                <Input
                  maxW="70px"
                  mr="2rem"
                  value={sleepDuration}
                  onChange={(event) =>
                    setSleepDuration(parseInt(event.target.value))
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
                  value={sleepDuration}
                  onChange={(value) => setSleepDuration(value)}
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
              <FormLabel>Quality</FormLabel>
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
                      <RadioCard radioType={RadioType.NumberRadio} {...radio}>
                        {value + 1}
                      </RadioCard>
                    );
                  })}
              </HStack>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormControl id="stress">
              <FormLabel>Stress</FormLabel>
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
                      radioType={RadioType.IconRadio}
                      icon={option.icon}
                      title={option.title}
                      {...radio}
                    >
                      {option}
                    </RadioCard>
                  );
                })}
              </HStack>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
            <FormControl id="symptoms">
              <FormLabel>Activities</FormLabel>
              {activities.map((activity) => (
                <Collapse startingHeight={0} in={activity.collapse}>
                  <ActivityForm
                    activity={activity}
                    setActivity={handleSetActivity}
                    removeActivity={handleRemoveActivity}
                  />
                </Collapse>
              ))}
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  onClick={handleAddActivity}
                  leftIcon={<FontAwesomeIcon icon="plus" />}
                  variant="outline"
                >
                  Add activity
                </Button>
              </Box>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormControl id="email">
              <FormLabel>Stool type (Bristol's scale)</FormLabel>
              <Collapse startingHeight={0} in={addBST}>
                <Box px={4} py={2} mb={4}>
                  <HStack
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    {...getBSTRadioProps.getRootProps()}
                  >
                    {Array(7)
                      .fill(0)
                      .map((_, value) => {
                        const radio = getBSTRadioProps.getRadioProps({
                          value: (value + 1).toString(),
                        });
                        return (
                          <RadioCard
                            radioType={RadioType.NumberRadio}
                            {...radio}
                          >
                            {value + 1}
                          </RadioCard>
                        );
                      })}
                  </HStack>
                </Box>
              </Collapse>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button
                  onClick={() => setAddBST(!addBST)}
                  leftIcon={<FontAwesomeIcon icon="plus" />}
                  variant="outline"
                >
                  Add new BST
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
              <FormLabel htmlFor="therapy">In therapy?</FormLabel>
              <Switch
                onChange={(e) => setInTherapy(e.target.checked)}
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
              <FormLabel htmlFor="menstruation">Menstruation?</FormLabel>
              <Switch
                onChange={(e) => setMenstruation(e.target.checked)}
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
              <FormLabel htmlFor="migraine">Migraine?</FormLabel>
              <Switch
                onChange={(e) => setMigraine(e.target.checked)}
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
              <FormLabel htmlFor="pollakiuria">Pollakiuria?</FormLabel>
              <Switch
                onChange={(e) => setPollakiuria(e.target.checked)}
                id="pollakiuria"
                size="lg"
              />
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={4}>
            <FormControl id="email">
              <FormLabel>General rate of the day</FormLabel>
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
                      <RadioCard radioType={RadioType.NumberRadio} {...radio}>
                        {value + 1}
                      </RadioCard>
                    );
                  })}
              </HStack>
            </FormControl>
          </Box>

          <Box borderWidth={1} rounded={"lg"} boxShadow={"lg"} p={8}>
            <FormControl id="email">
              <FormLabel>Notes</FormLabel>
              <Textarea
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Here is a sample placeholder"
              />
            </FormControl>
          </Box>

          <Button
            mt={4}
            colorScheme="teal"
            onClick={onSubmit}
            isLoading={fetching}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default CreateForm;
