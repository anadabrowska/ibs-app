import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import { useRadioGroup } from "@chakra-ui/radio";
import React from "react";
import RadioCard, { RadioType } from "../RadioCard";

export interface IStoolType {
  id: number;
  type: number;
  collapse?: boolean;
}

interface IStoolTypeForm {
  stoolType: IStoolType;
  setStoolType: (value: IStoolType) => void;
  removeStoolType: (id: number) => void;
}

const StoolTypeForm: React.FC<IStoolTypeForm> = ({
  stoolType,
  setStoolType,
  removeStoolType,
}: IStoolTypeForm) => {
  React.useEffect(() => {
    setTimeout(() => setStoolType({ ...stoolType, collapse: true }), 100);
  }, []);

  const getTypeRadioProps = useRadioGroup({
    defaultValue: stoolType.type.toString(),
    onChange: (value) =>
      setStoolType({
        ...stoolType,
        type: parseInt(value),
      }),
  });

  return (
    <Box px={4} py={2} mb={4}>
      <Box display="flex" justifyContent="end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStoolType({ ...stoolType, collapse: false });
            setTimeout(() => removeStoolType(stoolType.id), 150);
          }}
        >
          Remove
        </Button>
      </Box>
      <HStack
        marginY={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        {...getTypeRadioProps.getRootProps()}
      >
        {Array(7)
          .fill(0)
          .map((_, value) => {
            const radio = getTypeRadioProps.getRadioProps({
              value: (value + 1).toString(),
            });
            return (
              <RadioCard radioType={RadioType.NumberRadio} {...radio}>
                {value + 1}
              </RadioCard>
            );
          })}
      </HStack>
    </Box>
  );
};

export default StoolTypeForm;
