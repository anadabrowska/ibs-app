import {
  Box,
  Collapse,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
} from "@chakra-ui/react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

interface FaqProps {
  isOpen: boolean;
  screenWidth: number;
  onClose: () => void;
}

const Faq: React.FC<FaqProps> = ({ isOpen, screenWidth, onClose }) => {
  const definedFaqs = [
    {
      question: "Faq.question-1",
      answer: "Faq.answer-1",
      isOpen: false,
    },
    {
      question: "Faq.question-2",
      answer: "Faq.answer-2",
      isOpen: false,
    },
    {
      question: "Faq.question-3",
      answer: "Faq.answer-3",
      isOpen: false,
    },
    {
      question: "Faq.question-4",
      answer: "Faq.answer-4",
      isOpen: false,
    },
  ];
  const [FAQs, setFAQs] = useState(definedFaqs);

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
        <DrawerHeader>FAQ</DrawerHeader>

        <DrawerBody>
          <List>
            {FAQs.map((faq, index) => (
              <Box key={faq.question}>
                <ListItem
                  as="button"
                  width="100%"
                  onClick={() => {
                    setFAQs(
                      FAQs.map((q, i) =>
                        i === index
                          ? { ...q, isOpen: !q.isOpen }
                          : { ...q, isOpen: false }
                      )
                    );
                  }}
                >
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="space-between"
                    py={3}
                  >
                    <Box textAlign={"left"}>
                      <FormattedMessage id={faq.question} />
                    </Box>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Box>
                  <Divider />
                </ListItem>
                <Collapse in={faq.isOpen} animateOpacity>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    padding={5}
                    my={5}
                  >
                    <FormattedMessage id={faq.answer} />
                  </Box>
                </Collapse>
              </Box>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Faq;
