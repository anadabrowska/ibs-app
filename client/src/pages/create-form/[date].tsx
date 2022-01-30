import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import {
  FormInput,
  useCreateFormMutation,
  useOpenExperimentsQuery,
} from "../../generated/graphql";
import { mapErrors } from "../../utils/mapErrors";
import { IExperiment } from "../../components/form/ExperimentFrom";
import DailyForm from "../../components/form/DailyForm";
import { dayFormOptimistic, dayFormUpdate } from "../../utils/trackedQueries";
import { useIntl } from "react-intl";

const CreateForm: NextPage<{ date: string }> = ({ date }) => {
  // TODO: in the future add option to edit and create forms for the past
  const [day, month, year] = date.split("-");

  const router = useRouter();
  const [createForm, { loading }] = useCreateFormMutation();

  const [stoolTypes, setStoolTypes] = useState<IStoolType[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);
  const [experiments, setExperiments] = useState<IExperiment[]>([]);

  const [weight, setWeight] = useState(0);
  const [sleepDuration, setSleepDuration] = useState(8);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [generalMood, setGeneralMood] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);
  const [dayRate, setDayRate] = useState(0);
  const [inTherapy, setInTherapy] = useState(false);
  const [menstruation, setMenstruation] = useState(false);
  const [migraine, setMigraine] = useState(false);
  const [pollakiuria, setPollakiuria] = useState(false);
  const [notes, setNotes] = useState("");

  const { data } = useOpenExperimentsQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    handleExperiments();
  }, [data]);

  const intl = useIntl();

  const handleExperiments = () => {
    const newExperiments: IExperiment[] =
      data?.openExperiments?.map((openExperiment, id) => {
        const newExperimentForm: IExperiment = {
          id,
          experimentId: openExperiment.id,
          productName: openExperiment.productName,
          generalSensation: 0,
          quantity: "",
        };
        return newExperimentForm;
      }) || [];
    setExperiments(newExperiments);
  };

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

        createForm({
          variables: { input: formState },
          update: async (cache, context) => {
            dayFormUpdate(cache, context);

            if (!navigator.onLine) {
              router.push(`/day/${day}-${month}-${year}`);
            }
          },
          optimisticResponse: { createForm: dayFormOptimistic(formState) },
          onCompleted: (data) => {
            if (data?.createForm.errors) {
              setErrors(mapErrors(data.createForm.errors, intl));
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

CreateForm.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default CreateForm;
