import React, { useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Grid,
  GridItem,
  VStack,
  Heading,
  IconButton,
  Image,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

export default function OtherInformation({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form data Veridables
   */
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [bio, setBio] = useState("");
  const [serviceRates, setServiceRates] = useState([{ type: "", rate: "" }]);
  const [references, setReferences] = useState([{ name: "", contact: "" }]);
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState("");
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] =
    useState("");

  /**
   * Visible component variables
   */
  const toast = useToast();
  const [profilePictureError, setProfilePictureError] = useState(false);
  const [bioError, setBioError] = useState(false);
  const [serviceRatesError, setServiceRatesError] = useState(false);
  const [referenceError, setReferencesError] = useState(false);
  const [emergencyContactNameError, setEmergencyContactNameError] =
    useState(false);
  const [
    emergencyContactRelationshipError,
    setEmergencyContactRelationshipError,
  ] = useState(false);
  const [
    emergencyContactPhoneNumberError,
    setEmergencyContactPhoneNumberError,
  ] = useState(false);

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

  /**
   * Handle veriables changes
   */
  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };
  /**
   * Methods to handle the service rate changes
   */
  const handleServiceRateChange = (index, event) => {
    const { name, value } = event.target;
    const newRates = serviceRates.map((rate, i) =>
      i === index ? { ...rate, [name]: value } : rate
    );
    setServiceRates(newRates);
  };

  const handleAddServiceRate = () => {
    setServiceRates([...serviceRates, { type: "", rate: "" }]);
  };

  const handleRemoveServiceRate = (index) => {
    const newRates = serviceRates.filter((_, i) => i !== index);
    setServiceRates(newRates);
  };

  /**
   * Method to handle the reference changes
   */
  const handleReferenceChange = (index, event) => {
    const { name, value } = event.target;
    const newReferences = references.map((ref, i) =>
      i === index ? { ...ref, [name]: value } : ref
    );
    setReferences(newReferences);
  };

  const handleAddReference = () => {
    setReferences([...references, { name: "", contact: "" }]);
  };

  const handleRemoveReference = (index) => {
    const newReferences = references.filter((_, i) => i !== index);
    setReferences(newReferences);
  };
  /**
   * Handle the prev click
   */
  const handlePrev = () => {
    handlePrevClick();
  };

  // Phone Number validate function
  function validatePhoneNumber(phoneNumber) {
    console.log(phoneNumber.length);
    if (phoneNumber.length != 10) {
      return false;
    }
    const regex = /^[0-9]+$/;
    return regex.test(phoneNumber);
  }

  /**
   * Handle the next button click
   */
  const handleNext = () => {
    // Handle form submission logic
    if (profilePicture == null) {
      return throwInvalidFormatError(
        "Please select profile picture of your choice",
        setProfilePictureError
      );
    }
    if (bio == "") {
      return throwInvalidFormatError(
        "Please add description about yourself",
        setBioError
      );
    }
    if (serviceRates.length == 0) {
      return toast({
        title: "Please add at least one service rates info.",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    if (references.length == 0) {
      return toast({
        title: "Please add at least one reference info.",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
    if (
      serviceRates.at(serviceRates.length - 1).type == "" ||
      serviceRates.at(serviceRates.length - 1).rate == ""
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setServiceRatesError
      );
    }
    if (
      references.at(references.length - 1).name == "" ||
      references.at(references.length - 1).contact == ""
    ) {
      return throwInvalidFormatError(
        "Please fill all the required fields",
        setReferencesError
      );
    }
    if (emergencyContactName == "") {
      return throwInvalidFormatError(
        "Please add name of emergency contact",
        setEmergencyContactNameError
      );
    }
    if (emergencyContactRelationship == "") {
      return throwInvalidFormatError(
        "Please specify relationship with emergency contact",
        setEmergencyContactRelationshipError
      );
    }
    if (
      emergencyContactPhoneNumber == "" ||
      !validatePhoneNumber(emergencyContactPhoneNumber)
    ) {
      return throwInvalidFormatError(
        "Please provided valid phone number of emergency contact",
        setEmergencyContactPhoneNumberError
      );
    }

    // Add details to form data
    setWorkerWalaInfo({
      ...workerWalaInfo,
      profilePicture: profilePicture,
      bio: bio,
      serviceRates: serviceRates,
      references: references,
      emergencyContactName: emergencyContactName,
      emergencyContactRelationship: emergencyContactRelationship,
      emergencyContactPhoneNumber: emergencyContactPhoneNumber,
    });
    handleNextOrSubmit();
  };
  return (
    <div className="background_information_body multistep_form_step_body">
      <Heading size="lg">Other Information</Heading>
      <div className="background_information_container multistep_form_step_container">
        <ChakraProvider>
          <Box p={5}>
            <VStack spacing={6}>
              <FormControl isInvalid={profilePictureError} id="profile-picture">
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file"
                  height="60px"
                  padding="4px"
                  borderColor="teal.500"
                  onChange={(event) =>
                    handleFileChange(event, setProfilePicture)
                  }
                />
                {profilePicturePreview && (
                  <Image
                    src={profilePicturePreview}
                    alt="Profile Preview"
                    boxSize="100px"
                    border="1px solid teal"
                    borderRadius="md"
                  />
                )}
              </FormControl>

              <FormControl id="bio">
                <FormLabel>Bio/Description</FormLabel>
                <Textarea
                  isInvalid={bioError}
                  resize="none"
                  variant="filled"
                  placeholder="Enter your bio or description"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </FormControl>

              <FormControl id="service-rates">
                <FormLabel>Service Rates</FormLabel>
                {serviceRates.map((rate, index) => (
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
                      templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
                      gap={4}
                      key={index}
                      mb={3}
                    >
                      <GridItem colSpan={{ base: 12, md: 5 }}>
                        <Input
                          isInvalid={serviceRatesError}
                          variant="filled"
                          placeholder="Rate Type"
                          name="type"
                          id="type"
                          value={rate.type}
                          onChange={(event) =>
                            handleServiceRateChange(index, event)
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 12, md: 5 }}>
                        <Input
                          isInvalid={serviceRatesError}
                          variant="filled"
                          placeholder="Rate in ₹"
                          name="rate"
                          type="number"
                          id="rate"
                          value={rate.rate}
                          onChange={(event) =>
                            handleServiceRateChange(index, event)
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 12, md: 2 }}>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleRemoveServiceRate(index)}
                          aria-label={`Remove service rate ${index + 1}`}
                        />
                      </GridItem>
                    </Grid>
                  </Box>
                ))}
                <Button
                  onClick={handleAddServiceRate}
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                >
                  Add Service Rate
                </Button>
              </FormControl>

              <FormControl id="references">
                <FormLabel>References</FormLabel>
                {references.map((reference, index) => (
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
                      templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
                      gap={4}
                      key={index}
                      mb={3}
                    >
                      <GridItem colSpan={{ base: 12, md: 5 }}>
                        <Input
                          isInvalid={referenceError}
                          variant="filled"
                          placeholder="Name"
                          name="name"
                          id="name"
                          value={reference.name}
                          onChange={(event) =>
                            handleReferenceChange(index, event)
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 12, md: 5 }}>
                        <Input
                          isInvalid={referenceError}
                          variant="filled"
                          placeholder="Contact"
                          name="contact"
                          type="number"
                          id="contact"
                          value={reference.contact}
                          onChange={(event) =>
                            handleReferenceChange(index, event)
                          }
                        />
                      </GridItem>
                      <GridItem colSpan={{ base: 12, md: 2 }}>
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => handleRemoveReference(index)}
                          aria-label={`Remove reference ${index + 1}`}
                        />
                      </GridItem>
                    </Grid>
                  </Box>
                ))}
                <Button
                  onClick={handleAddReference}
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                >
                  Add Reference
                </Button>
              </FormControl>

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }}
                gap={4}
                width="100%"
              >
                <GridItem colSpan={{ base: 12, md: 4 }}>
                  <FormControl id="emergency-contact-name">
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <Input
                      isInvalid={emergencyContactNameError}
                      variant="filled"
                      placeholder="Emergency Contact Name"
                      value={emergencyContactName}
                      onChange={(event) =>
                        setEmergencyContactName(event.target.value)
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                  <FormControl id="emergency-contact-relationship">
                    <FormLabel>Emergency Contact Relationship</FormLabel>
                    <Input
                      isInvalid={emergencyContactRelationshipError}
                      variant="filled"
                      placeholder="Relationship"
                      value={emergencyContactRelationship}
                      onChange={(event) =>
                        setEmergencyContactRelationship(event.target.value)
                      }
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 4 }}>
                  <FormControl id="emergency-contact-phone">
                    <FormLabel>Emergency Contact Phone Number</FormLabel>
                    <Input
                      type="number"
                      isInvalid={emergencyContactPhoneNumberError}
                      variant="filled"
                      placeholder="Phone Number"
                      value={emergencyContactPhoneNumber}
                      onChange={(event) =>
                        setEmergencyContactPhoneNumber(event.target.value)
                      }
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
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
