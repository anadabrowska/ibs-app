import {
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import { FormattedMessage } from "react-intl";

const StoolTypePopoverContent: React.FC = () => {
  return (
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>
        <FormattedMessage id="DailyForm.popover.stool-types-header" />
      </PopoverHeader>
      <PopoverBody>
        <UnorderedList>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-1" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-2" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-3" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-4" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-5" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-6" />
          </ListItem>
          <ListItem>
            <FormattedMessage id="DailyForm.popover.stool-type-7" />
          </ListItem>
        </UnorderedList>
      </PopoverBody>
    </PopoverContent>
  );
};

export default StoolTypePopoverContent;
