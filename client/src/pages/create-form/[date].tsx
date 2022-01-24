import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import {
  DayFormDocument,
  FormInput,
  useCreateFormMutation,
  useOpenExperimentsQuery,
} from "../../generated/graphql";
import { mapErrors } from "../../utils/mapErrors";
import { IExperiment } from "../../components/form/ExperimentFrom";
import DailyForm from "../../components/form/DailyForm";

const CreateForm: NextPage<{ date: string }> = ({ date }) => {
  // TODO: we need date to create form for past dates in the future
  const [day, month, year] = date.split("-");

  const router = useRouter();
  const [createForm, { loading }] = useCreateFormMutation();

  const [stoolTypes, setStoolTypes] = useState<IStoolType[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);
  const [experiments, setExperiments] = useState<IExperiment[]>([]);

  //TODO: default weight needs to come from the form from yesterday
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
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    handleExperiments();
  }, [data]);

  const handleExperiments = () => {
    const newExperiments: IExperiment[] = [];
    data?.openExperiments?.map((openExperiment) => {
      const id =
        newExperiments.length > 0
          ? newExperiments[newExperiments.length - 1].id + 1
          : 0;
      const newExperimentForm: IExperiment = {
        id,
        experimentId: openExperiment.id,
        productName: openExperiment.productName,
        generalSensation: 0,
        quantity: "",
      };
      newExperiments.push(newExperimentForm);
    });
    setExperiments([...experiments, ...newExperiments]);
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
          update: (cache, context) => {
            const dateObj = new Date();
            const day = dateObj.getDate();
            const month = dateObj.getMonth() + 1;
            const year = dateObj.getFullYear();
            const date = `${year}-${month}-${day}`;

            const dayForm = (context as any).data.createForm.form;

            cache.writeQuery({
              query: DayFormDocument,
              variables: { date },
              data: {
                dayForm: dayForm,
              },
            });

            if (!navigator.onLine) {
              router.push(`/day/${day}-${month}-${year}`);
            }
          },
          optimisticResponse: {
            createForm: {
              form: {
                id: -1,
                createdAt: new Date().getTime().toString(),
                ...formState,
                symptoms: formState.symptoms.map((symptom) => ({
                  id: -1,
                  ...symptom,
                  __typename: "Symptom",
                })),
                activities: formState.activities.map((activity) => ({
                  id: -1,
                  ...activity,
                  __typename: "Activity",
                })),
                experiments: formState.experiments.map((experiment) => ({
                  id: -1,
                  ...experiment,
                  __typename: "ExperimentForm",
                })),
                __typename: "Form",
              },
              errors: [],
              __typename: "FormResponse",
            },
          },
          onCompleted: (data) => {
            if (data?.createForm.errors) {
              setErrors(mapErrors(data.createForm.errors));
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
