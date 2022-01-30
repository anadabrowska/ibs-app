import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import {
  FormInput,
  useDayFormQuery,
  useUpdateFormMutation,
} from "../../generated/graphql";
import router from "next/router";
import DailyForm from "../../components/form/DailyForm";
import { Formik } from "formik";
import { mapErrors } from "../../utils/mapErrors";
import { IExperiment } from "../../components/form/ExperimentFrom";
import { dayFormUpdate, dayFormOptimistic } from "../../utils/trackedQueries";

const UpdateForm: NextPage<{ date: string }> = ({ date }) => {
  const [day, month, year] = date.split("-");

  const { loading, data } = useDayFormQuery({
    variables: { date: `${year}-${month}-${day}` },
    fetchPolicy: "cache-and-network",
  });

  const [updateForm] = useUpdateFormMutation();

  const [weight, setWeight] = useState(0);
  const [dayRate, setDayRate] = useState(0);
  const [generalMood, setGeneralMood] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [sleepDuration, setSleepDuration] = useState(8);

  const [migraine, setMigraine] = useState(false);
  const [inTherapy, setInTherapy] = useState(false);
  const [pollakiuria, setPollakiuria] = useState(false);
  const [menstruation, setMenstruation] = useState(false);

  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [stoolTypes, setStoolTypes] = useState<IStoolType[]>([]);
  const [experiments, setExperiments] = useState<IExperiment[]>([]);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (data?.dayForm) {
      setNotes(data.dayForm.notes || "");

      setWeight(data.dayForm.weight || 0);
      setDayRate(data.dayForm.dayRate || 0);
      setGeneralMood(data.dayForm.mood || 0);
      setStressLevel(data.dayForm.stressLevel || 0);
      setSleepQuality(data.dayForm.sleepQuality || 0);
      setSleepDuration(data.dayForm.sleepLenght || 0);

      const symptomsData =
        data.dayForm.symptoms?.map((symptom: any) => ({
          id: symptom.id,
          name: symptom.name || "",
          intensity: symptom.intensity || 0,
          isDangerous: symptom.isDangerous || false,
          collapse: true,
        })) || [];
      setSymptoms(symptomsData);

      const activitiesData =
        data?.dayForm?.activities?.map((activity: any) => ({
          id: activity.id,
          duration: activity.time || 0,
          moodAfter: activity.moodAfter || 0,
          name: activity.type || "",
          collapse: true,
        })) || [];
      setActivities(activitiesData);

      const stoolData =
        data?.dayForm?.stoolTypes.map((type: number, id: number) => ({
          id,
          type: type || 0,
          collapse: true,
        })) || [];
      setStoolTypes(stoolData);

      const experimentsData =
        data?.dayForm?.experiments?.map((experiment: any) => ({
          id: experiment.id,
          productName: experiment.productName,
          experimentId: experiment.experimentId,
          generalSensation: experiment.generalSensation || 0,
          quantity: experiment.quantity || "",
        })) || [];
      setExperiments(experimentsData);

      setMigraine(!!data.dayForm.migraine);
      setInTherapy(!!data.dayForm.inTherapy);
      setPollakiuria(!!data.dayForm.pollakiuria);
      setMenstruation(!!data.dayForm.menstruation);
    }
  }, [data]);

  const initialValues: FormInput = {
    mood: 0,
    weight: 0,
    symptoms: [],
    sleepLenght: 0,
    sleepQuality: 0,
    stressLevel: 0,
    activities: [],
    stoolTypes: [],
    experiments: [],
    inTherapy: false,
    pollakiuria: false,
    menstruation: false,
    migraine: false,
    dayRate: 0,
    notes: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setErrors }) => {
        const formState = {
          mood: generalMood,
          weight: weight,
          symptoms: symptoms.map((symptom) => {
            return {
              name: symptom.name,
              intensity: symptom.intensity,
              isDangerous: symptom.isDangerous,
            };
          }),
          sleepLenght: sleepDuration,
          sleepQuality: sleepQuality,
          stressLevel: stressLevel,
          activities: activities.map((activity) => {
            return {
              type: activity.name,
              moodAfter: activity.moodAfter,
              time: activity.duration,
            };
          }),
          stoolTypes: stoolTypes.map((elem) => {
            return elem.type;
          }),
          experiments: experiments
            .filter(
              (experiment) =>
                experiment.quantity != "" && experiment.generalSensation != 0
            )
            .map((experiment) => {
              return {
                experimentId: experiment.experimentId,
                quantity: experiment.quantity,
                productName: experiment.productName,
                generalSensation: experiment.generalSensation,
              };
            }),
          inTherapy: inTherapy,
          menstruation: menstruation,
          migraine: migraine,
          pollakiuria: pollakiuria,
          dayRate: dayRate,
          notes: notes,
        };

        updateForm({
          variables: { input: formState, date: `${year}-${month}-${day}` },
          update: async (cache, context) => {
            dayFormUpdate(cache, context);

            if (!navigator.onLine) {
              router.push(`/day/${day}-${month}-${year}`);
            }
          },
          optimisticResponse: { updateForm: dayFormOptimistic(formState) },
          onCompleted: (data) => {
            if (data?.updateForm.errors) {
              setErrors(mapErrors(data.updateForm.errors));
            } else {
              router.push(`/day/${day}-${month}-${year}`);
            }
          },
          context: { tracked: true },
        });
      }}
    >
      {({ errors, touched, handleSubmit, handleBlur }) => (
        <DailyForm
          errors={errors}
          touched={touched}
          weight={weight}
          dayRate={dayRate}
          generalMood={generalMood}
          stressLevel={stressLevel}
          sleepQuality={sleepQuality}
          sleepDuration={sleepDuration}
          loading={loading}
          migraine={migraine}
          inTherapy={inTherapy}
          pollakiuria={pollakiuria}
          menstruation={menstruation}
          notes={notes}
          symptoms={symptoms}
          activities={activities}
          stoolTypes={stoolTypes}
          experiments={experiments}
          setWeight={setWeight}
          setGeneralMood={setGeneralMood}
          setDayRate={setDayRate}
          setStressLevel={setStressLevel}
          setSleepQuality={setSleepQuality}
          setSleepDuration={setSleepDuration}
          setMigraine={setMigraine}
          setInTherapy={setInTherapy}
          setPollakiuria={setPollakiuria}
          setMenstruation={setMenstruation}
          setNotes={setNotes}
          setSymptoms={setSymptoms}
          setActivities={setActivities}
          setStoolTypes={setStoolTypes}
          setExperiments={setExperiments}
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        />
      )}
    </Formik>
  );
};

UpdateForm.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default UpdateForm;
