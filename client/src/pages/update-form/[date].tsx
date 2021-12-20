import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IActivity } from "../../components/form/ActivityForm";
import { IStoolType } from "../../components/form/StoolTypeForm";
import { ISymptom } from "../../components/form/SymptomForm";
import {
  useDayFormQuery,
  useUpdateFormMutation,
} from "../../generated/graphql";
import router from "next/router";
import DailyForm from "../../components/form/DailyForm";

const updateForm: NextPage<{ date: string }> = ({ date }) => {
  const [day, month, year] = date.split("-");

  const { loading, data } = useDayFormQuery({
    variables: { date: `${year}-${month}-${day}` },
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

      setMigraine(!!data.dayForm.migraine);
      setInTherapy(!!data.dayForm.inTherapy);
      setPollakiuria(!!data.dayForm.pollakiuria);
      setMenstruation(!!data.dayForm.menstruation);
    }
  }, [data]);

  const onSubmit = async () => {
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
    await updateForm({
      variables: { input: formState, id: data?.dayForm?.id || 0 },
    });

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
      onSubmit={onSubmit}
    />
  );
};

updateForm.getInitialProps = ({ query }) => {
  return {
    date: query.date as string,
  };
};

export default updateForm;
