import { EndExperimentInput } from "src/resolvers/experiment";

export const validateExperiment = (experiment: EndExperimentInput) => {
  if (experiment.isTolerable && experiment.quantity === "") {
    return {
      errors: [
        {
          fieldName: "quantity",
          errorId: "ExperimentError.quantity.empty",
          message:
            "If you tolerate the product pass the approximate ammount you tolerate",
        },
      ],
    };
  }
  if (experiment.productName === "") {
    return {
      errors: [
        {
          fieldName: "productName",
          errorId: "ExperimentError.productName.empty",
          message:
            "You need to pass the name of the product you want to make an experiment on",
        },
      ],
    };
  }
  return null;
};
