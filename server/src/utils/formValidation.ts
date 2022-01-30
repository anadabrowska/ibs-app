import { FormInput } from "src/resolvers/form";

export const validateForm = (form: FormInput) => {
  if (form.mood === 0) {
    return {
      errors: [
        {
          fieldName: "mood",
          errorId: "FormError.mood.empty",
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
          errorId: "FormError.weight.empty",
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
          errorId: "FormError.sleepLenght.empty",
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
          errorId: "FormError.sleepQuality.empty",
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
          errorId: "FormError.stressLevel.empty",
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
          errorId: "FormError.dayRate.empty",
          message: "You need to select a day rate",
        },
      ],
    };
  }
  return null;
};
