import { Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import DailyForm from "../../components/form/DailyForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import { FormInput, useCreateFormMutation } from "../../generated/graphql";
import { mapErrors } from "../../utils/mapErrors";

const CreateForm: NextPage<{ date: string }> = ({ date }) => {
  // TODO: we need date to create form for past dates in the future
  const [day, month, year] = date.split("-");

  const router = useRouter();
  const [createForm, { loading }] = useCreateFormMutation();

  const [stoolTypes, setStoolTypes] = useState<IStoolType[]>([]);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);

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

  const initialValues: FormInput = {
    mood: 0,
    weight: 0,
    symptoms: [],
    sleepLenght: 0,
    sleepQuality: 0,
    stressLevel: 0,
    activities: [],
    stoolTypes: [],
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
          inTherapy: inTherapy,
          menstruation: menstruation,
          migraine: migraine,
          pollakiuria: pollakiuria,
          dayRate: dayRate,
          notes: notes,
        };
        const response = await createForm({ variables: { input: formState } });

        if (response.data?.createForm.errors) {
          setErrors(mapErrors(response.data.createForm.errors));
        } else {
          router.push(`/day/${day}-${month}-${year}`);
        }
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
