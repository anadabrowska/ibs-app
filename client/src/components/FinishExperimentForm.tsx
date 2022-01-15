import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Switch,
  Textarea,
  Button,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  ExperimentQuery,
  useEndExperimentMutation,
} from "../generated/graphql";
import { mapErrors } from "../utils/mapErrors";
import FormInput from "./FormInput";

const FinishExperimentForm: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  experimentData: ExperimentQuery | undefined;
}> = ({ isOpen, onClose, experimentData }) => {
  const [endExperiment] = useEndExperimentMutation();

  const intl = useIntl();

  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <Drawer
      size={screenWidth > 425 ? "md" : "full"}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <FormattedMessage id="ExperimentDetails.finish-experiment" />
        </DrawerHeader>
        <Formik
          initialValues={{
            productName: experimentData?.experiment?.productName || "",
            isTolerable: false,
            notes: "",
            quantity: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await endExperiment({
              variables: {
                input: values,
                id: experimentData?.experiment?.id || 0,
              },
            });
            if (response.data?.endExperiment.errors) {
              setErrors(mapErrors(response.data.endExperiment.errors));
            } else if (response.data?.endExperiment.experiment) {
              router.push({
                pathname: "/",
                query: {
                  tabName: "closed-experiments",
                },
              });
            }
          }}
        >
          {(props) => (
            <DrawerBody>
              <Form>
                <FormInput
                  name="productName"
                  label={intl.formatMessage({
                    id: "ExperimentDetails.product-name",
                  })}
                  placeholder={intl.formatMessage({
                    id: "ExperimentDetails.product-name-placeholder",
                  })}
                />
                <FormControl
                  mt={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormLabel>
                    <FormattedMessage id="ExperimentDetails.is-tolerable" />
                  </FormLabel>
                  <Switch
                    onChange={(e) =>
                      props.setValues({
                        ...props.values,
                        isTolerable: e.target.checked,
                      })
                    }
                    isChecked={props.values.isTolerable}
                    mb={4}
                    id="isTolerable"
                    size="lg"
                  />
                </FormControl>
                <FormControl
                  id="quantity"
                  isInvalid={
                    (props.errors.quantity && props.touched.quantity) || false
                  }
                >
                  <FormLabel mb={2}>
                    <FormattedMessage id="ExperimentDetails.tolerated-amount" />
                  </FormLabel>
                  <Input
                    onChange={(e) =>
                      props.setValues({
                        ...props.values,
                        quantity: e.target.value,
                      })
                    }
                    value={props.values.quantity}
                    disabled={!props.values.isTolerable}
                    placeholder={intl.formatMessage({
                      id: "ExperimentDetails.tolerated-amount-placeholder",
                    })}
                  />
                  <FormErrorMessage>{props.errors.quantity}</FormErrorMessage>
                </FormControl>
                <FormControl id="notes" mt={5}>
                  <FormLabel mb={2}>
                    <FormattedMessage id="ExperimentDetails.notes" />
                  </FormLabel>
                  <Textarea
                    onChange={(e) =>
                      props.setValues({
                        ...props.values,
                        notes: e.target.value,
                      })
                    }
                    value={props.values.notes}
                    placeholder={intl.formatMessage({
                      id: "ExperimentDetails.notes-placeholder",
                    })}
                  />
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  <FormattedMessage id="general.submit" />
                </Button>
              </Form>
            </DrawerBody>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishExperimentForm;
