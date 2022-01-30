import React, { Fragment } from "react";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { gql } from "@apollo/client";
import { IntlProvider } from "react-intl";
import messages from "../src/i18n/messages";
import { LOCALES } from "../src/i18n/locales";
import OpenExperiments from "../src/components/OpenExperiments";

const openExperimentsQuery = gql`
  query OpenExperiments {
    openExperiments {
      id
      productName
      startDate
    }
  }
`;

const startExperimentMutation = gql`
  mutation StartExperiment($input: StartExperimentInput!) {
    startExperiment(input: $input) {
      experiment {
        id
        productName
        startDate
      }
      errors {
        ...StarndardError
      }
    }
  }

  fragment StarndardError on FieldError {
    fieldName
    message
  }
`;

let queryCalled = false;
const newTestExperiment = {
  id: 1,
  productName: "tomato",
  startDate: "1643486196654",
};
const openExperimentsSuccessData = [
  {
    request: {
      query: openExperimentsQuery,
    },
    newData: jest.fn().mockReturnValue(() => {
      if (queryCalled) {
        return {
          //refetched data
          data: {
            openExperiments: [newTestExperiment],
          },
        };
      } else {
        queryCalled = true;
        return {
          //first fetched data
          data: {
            openExperiments: [],
          },
        };
      }
    }),
  },
  {
    request: {
      query: startExperimentMutation,
      variables: { input: { productName: newTestExperiment.productName } },
    },
    result: {
      data: {
        startExperiment: {
          experiment: {
            newTestExperiment,
          },
          errors: null,
        },
      },
    },
  },
];

const openExperimentsErrorData = [
  {
    request: {
      query: openExperimentsQuery,
    },
    result: {
      data: {
        openExperiments: [],
      },
    },
  },
  {
    request: {
      query: startExperimentMutation,
      variables: { input: { productName: "" } },
    },
    result: {
      data: {
        startExperiment: {
          experiment: null,
          errors: [
            {
              fieldName: "productName",
              message:
                "You need to pass the name of the product you want to make an experiment on",
            },
          ],
        },
      },
    },
  },
];

const mockSpy = openExperimentsSuccessData[0].newData;
test("It should correctly add new open experiment", async () => {
  const { getByLabelText, getByTestId, getByText } = render(
    <IntlProvider
      locale={LOCALES.ENGLISH}
      textComponent={Fragment}
      messages={messages[LOCALES.ENGLISH]}
    >
      <MockedProvider mocks={openExperimentsSuccessData} addTypename={false}>
        <OpenExperiments />
      </MockedProvider>
    </IntlProvider>
  );

  //open new experiment form
  const newExperimentButtom = getByTestId("new-experiment-button");
  fireEvent.click(newExperimentButtom);

  //fill product data
  const productInput = getByLabelText("Produkt name");
  fireEvent.change(productInput, { target: { value: "tomato" } });
  await waitFor(() =>
    expect((productInput as HTMLInputElement).value).toBe(
      newTestExperiment.productName
    )
  );

  //submit the form
  const submitButtom = getByTestId("submit-button");
  fireEvent.click(submitButtom);

  //wait for openexperiments to be refetched
  await waitFor(() => expect(mockSpy).toBeCalledTimes(2));
  //wait for data to load and check if there is new exeriment on the list
  await waitFor(() => getByText("Details", { selector: "button" }));
});

test("It should show errore message when product name is missing", async () => {
  const { getByTestId, getByText } = render(
    <IntlProvider
      locale={LOCALES.ENGLISH}
      textComponent={Fragment}
      messages={messages[LOCALES.ENGLISH]}
    >
      <MockedProvider mocks={openExperimentsErrorData} addTypename={false}>
        <OpenExperiments />
      </MockedProvider>
    </IntlProvider>
  );

  //open new experiment form
  const newExperimentButtom = getByTestId("new-experiment-button");
  fireEvent.click(newExperimentButtom);

  //do not fill product data

  //submit the form
  const submitButtom = getByTestId("submit-button");
  fireEvent.click(submitButtom);

  //wait for data to load and check for error message
  await waitFor(() =>
    getByText(
      "You need to pass the name of the product you want to make an experiment on"
    )
  );
});
