import { testGraphQLCall } from "../../src/testGraphQLCall";
import { Experiment } from "../../src/entities/experiment";
import { User } from "../../src/entities/User";

const startExperimentMutation = `
mutation StartExperiment($input: StartExperimentInput!) {
    startExperiment(input: $input) {
      experiment {
        id
        productName
        startDate
      }
      errors {
        fieldName
        errorId
        message
      }
    }
}`;

const endExperimentMutation = `
mutation EndExperiment($input: EndExperimentInput!, $id: Int!) {
    endExperiment(input: $input, id: $id) {
      experiment {
        id
        productName
        startDate
        endDate
        notes
        quantity
        isTolerable
      }
      errors {
        fieldName
        errorId
        message
      }
    }
}`;

const openExperimentsQuery = `
query OpenExperiments {
    openExperiments {
        id
        productName
        startDate
    }
}`;

const closedExperimentsQuery = `
query ClosedExperiments {
    closedExperiments {
      id
      productName
      startDate
      endDate
      notes
      quantity
      isTolerable
    }
}`;

export const experimentTest = () =>
  describe("experiment resolvers", () => {
    it("startExperiment and endExperiment mutations, openExperiments and closedExperiments queries", async () => {
      const dbUser = await User.findOne({ where: { email: "ania@test.com" } });

      const startTestInput = {
        productName: "tomato",
      };

      const startExperimentResponse = await testGraphQLCall(
        startExperimentMutation,
        {
          input: {
            productName: startTestInput.productName,
          },
        },
        dbUser!.id
      );

      const dbExperiment = await Experiment.findOne({
        where: { productName: startTestInput.productName },
      });

      expect(startExperimentResponse).toEqual({
        data: {
          startExperiment: {
            errors: null,
            experiment: {
              id: dbExperiment?.id,
              productName: dbExperiment?.productName,
              startDate: dbExperiment?.startDate.getTime().toString(),
            },
          },
        },
      });

      const openExperimentsResponse = await testGraphQLCall(
        openExperimentsQuery,
        {},
        dbUser!.id
      );

      expect(openExperimentsResponse).toEqual({
        data: {
          openExperiments: [
            {
              id: dbExperiment?.id,
              productName: dbExperiment?.productName,
              startDate: dbExperiment?.startDate.getTime().toString(),
            },
          ],
        },
      });

      const endTestInput = {
        isTolerable: true,
        notes: "some notes",
        productName: "tomato",
        quantity: "100g",
      };

      const endExperimentResponse = await testGraphQLCall(
        endExperimentMutation,
        {
          input: {
            isTolerable: endTestInput.isTolerable,
            notes: endTestInput.notes,
            productName: endTestInput.productName,
            quantity: endTestInput.quantity,
          },
          id: dbExperiment?.id,
        },
        dbUser!.id
      );

      const finishedDbExperiment = await Experiment.findOne({
        where: { id: dbExperiment?.id },
      });

      const experimentResponse = {
        id: finishedDbExperiment?.id,
        productName: finishedDbExperiment?.productName,
        startDate: finishedDbExperiment?.startDate.getTime().toString(),
        endDate: finishedDbExperiment?.endDate?.getTime().toString(),
        isTolerable: finishedDbExperiment?.isTolerable,
        quantity: finishedDbExperiment?.quantity,
        notes: finishedDbExperiment?.notes,
      };

      expect(endExperimentResponse).toEqual({
        data: {
          endExperiment: {
            errors: null,
            experiment: experimentResponse,
          },
        },
      });

      const closedExperimentsResponse = await testGraphQLCall(
        closedExperimentsQuery,
        {},
        dbUser!.id
      );

      expect(closedExperimentsResponse).toEqual({
        data: {
          closedExperiments: [experimentResponse],
        },
      });
    });
  });
