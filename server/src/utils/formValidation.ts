import { FormInput } from "src/resolvers/form";

export const validateForm = (form: FormInput) => {
  if (form.mood === 0) {
    return {
      errors: [
        {
          fieldName: "mood",
          message: "You need to select a mood",
        },
      ],
    };
  }
  if (form.weight === 0) {
    return {
      errors: [
        {
          fieldName: "weight",
          message: "You need to add your weight",
        },
      ],
    };
  }
  if (form.sleepLenght === 0) {
    return {
      errors: [
        {
          fieldName: "sleepLenght",
          message: "You need to add a sleep length",
        },
      ],
    };
  }
  if (form.sleepQuality === 0) {
    return {
      errors: [
        {
          fieldName: "sleepQuality",
          message: "You need to select a sleep quality",
        },
      ],
    };
  }
  if (form.stressLevel === 0) {
    return {
      errors: [
        {
          fieldName: "stressLevel",
          message: "You need to select a stress level",
        },
      ],
    };
  }
  if (form.dayRate === 0) {
    return {
      errors: [
        {
          fieldName: "dayRate",
          message: "You need to select a day rate",
        },
      ],
    };
  }
  return null;
};
