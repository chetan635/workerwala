import React, { useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import { Heading, useToast } from "@chakra-ui/react";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  IconButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../../../css/Authentication/workerwala-form-steps/BackgroundInformation.css";

export default function BackgroundInformation({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form Data Veriables
   */
  const [educationFields, setEducationFields] = useState([
    { school: "", degree: "", year: "" },
  ]);
  const [employmentFields, setEmploymentFields] = useState([
    { company: "", position: "", duration: "" },
  ]);

  /**
   * Visiable componet veriables
   */
  const toast = useToast();
  const [educationError, setEducationError] = useState(false);
  const [employmentError, setEmploymentError] = useState(false);

  /**
   * Method to handle the error toast
   * @param {*} title
   * @param {*} setupFunction
   * @returns
   */
  const throwInvalidFormatError = (title, setupFunction) => {
    setupFunction(true);
    return toast({
      title: title,
      status: "error",
      position: "top",
      isClosable: true,
      onCloseComplete: () => setupFunction(false),
    });
  };

  // Handle changes for educational background fields
  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = educationFields.map((field, i) => {
      if (i === index) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setEducationFields(newFields);
  };

  // Handle changes for previous employment fields
  const handleEmploymentChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = employmentFields.map((field, i) => {
      if (i === index) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setEmploymentFields(newFields);
  };

  // Add a new education field
  const handleAddEducationField = () => {
    if (
      educationFields.length != 0 &&
      (educationFields.at(educationFields.length - 1).school == "" ||
        educationFields.at(educationFields.length - 1).degree == "" ||
        educationFields.at(educationFields.length - 1).year == "")
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setEducationError
      );
    }
    setEducationFields([
      ...educationFields,
      { school: "", degree: "", year: "" },
    ]);
  };

  // Add a new employment field
  const handleAddEmploymentField = () => {
    if (
      employmentFields.length != 0 &&
      (employmentFields.at(employmentFields.length - 1).company == "" ||
        employmentFields.at(employmentFields.length - 1).position == "" ||
        employmentFields.at(employmentFields.length - 1).duration == "")
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setEmploymentError
      );
    }
    setEmploymentFields([
      ...employmentFields,
      { company: "", position: "", duration: "" },
    ]);
  };

  // Remove an education field
  const handleRemoveEducationField = (index) => {
    const newFields = educationFields.filter((_, i) => i !== index);
    setEducationFields(newFields);
  };

  // Remove an employment field
  const handleRemoveEmploymentField = (index) => {
    const newFields = employmentFields.filter((_, i) => i !== index);
    setEmploymentFields(newFields);
  };

  /**
   * Handle previous button click
   */
  const handlePrev = () => {
    handlePrevClick();
  };

  /**
   * Handle the next button click
   */
  const handleNext = () => {
    // Handle form submission logic
    if (employmentFields.length == 0 || educationFields.length == 0) {
      return toast({
        title:
          "Please add at least one educational and employment background information.",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    if (
      educationFields.at(educationFields.length - 1).school == "" ||
      educationFields.at(educationFields.length - 1).degree == "" ||
      educationFields.at(educationFields.length - 1).year == ""
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setEducationError
      );
    }
    if (
      employmentFields.at(employmentFields.length - 1).company == "" ||
      employmentFields.at(employmentFields.length - 1).position == "" ||
      employmentFields.at(employmentFields.length - 1).duration == ""
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setEmploymentError
      );
    }

    // Add details to form data
    setWorkerWalaInfo({
      ...workerWalaInfo,
      employmentDetails: employmentFields,
      educationDetails: educationFields,
    });

    // Navigate to next page
    handleNextOrSubmit();
  };

  return (
    <div className="background_information_body multistep_form_step_body">
      <Heading size="lg">Background Information</Heading>
      <div className="background_information_container multistep_form_step_container">
        <ChakraProvider>
          <Box p={5}>
            <FormControl id="education">
              <FormLabel size="lg">
                <div className="labels">
                  <Icon height="25px" icon="mdi:education-outline" />
                  <span>Educational Background </span>
                </div>
              </FormLabel>
              {educationFields.map((field, index) => (
                <Box
                  borderColor="teal.500"
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  padding="10px"
                  margin="10px 0px"
                  width="100%"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    }}
                    gap={4}
                    mb={3}
                  >
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={educationError}
                        placeholder="School"
                        name="school"
                        id="school"
                        variant="filled"
                        value={field.school}
                        onChange={(event) =>
                          handleEducationChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={educationError}
                        placeholder="Degree"
                        name="degree"
                        id="degree"
                        variant="filled"
                        value={field.degree}
                        onChange={(event) =>
                          handleEducationChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={educationError}
                        placeholder="Year"
                        name="year"
                        id="year"
                        variant="filled"
                        value={field.year}
                        onChange={(event) =>
                          handleEducationChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleRemoveEducationField(index)}
                        aria-label={`Remove education entry ${index + 1}`}
                      />
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                onClick={handleAddEducationField}
                leftIcon={<AddIcon />}
                colorScheme="teal"
              >
                Add Education Entry
              </Button>
            </FormControl>

            <FormControl id="employment" mt={8}>
              <FormLabel size="lg">
                {" "}
                <div className="labels">
                  <Icon height="25px" icon="mdi:worker" />{" "}
                  <span>Previous Employment</span>
                </div>
              </FormLabel>
              {employmentFields.map((field, index) => (
                <Box
                  borderColor="teal.500"
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  padding="10px"
                  margin="10px 0px"
                  width="100%"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    }}
                    gap={4}
                    mb={3}
                  >
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={employmentError}
                        placeholder="Company"
                        name="company"
                        id="company"
                        variant="filled"
                        value={field.company}
                        onChange={(event) =>
                          handleEmploymentChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={employmentError}
                        placeholder="Position"
                        name="position"
                        id="position"
                        variant="filled"
                        value={field.position}
                        onChange={(event) =>
                          handleEmploymentChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <Input
                        isInvalid={employmentError}
                        placeholder="Duration"
                        name="duration"
                        id="duration"
                        variant="filled"
                        value={field.duration}
                        onChange={(event) =>
                          handleEmploymentChange(index, event)
                        }
                      />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleRemoveEmploymentField(index)}
                        aria-label={`Remove employment entry ${index + 1}`}
                      />
                    </GridItem>
                  </Grid>
                </Box>
              ))}
              <Button
                onClick={handleAddEmploymentField}
                leftIcon={<AddIcon />}
                colorScheme="teal"
              >
                Add Employment Entry
              </Button>
            </FormControl>
          </Box>
        </ChakraProvider>
      </div>
      <MultiStepFormNavigation
        handlePrev={handlePrev}
        handleNext={handleNext}
        step={step}
      />
    </div>
  );
}
