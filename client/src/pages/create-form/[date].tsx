import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import DailyForm from "../../components/form/DailyForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import { useCreateFormMutation } from "../../generated/graphql";

const CreateForm: NextPage<{ date: string }> = ({ date }) => {
  // TODO: we need date to create form for past dates in the future
  const [day, month, year] = date.split("-");

  const router = useRouter();
  const [{ fetching }, createForm] = useCreateFormMutation();

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
    await createForm({ input: formState });

    router.push(`/day/${day}-${month}-${year}`);
  };

  return (
    <DailyForm
      weight={weight}
      dayRate={dayRate}
      generalMood={generalMood}
      stressLevel={stressLevel}
      sleepQuality={sleepQuality}
      sleepDuration={sleepDuration}
      fetching={fetching}
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
      onSubmit={onSubmit}
    />
  );
};

CreateForm.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default CreateForm;
