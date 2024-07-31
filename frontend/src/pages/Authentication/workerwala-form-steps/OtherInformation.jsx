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

  /**
   * Handle the next button click
   */
  const handleNext = () => {
    // Handle form submission logic
    console.log("Profile Picture:", profilePicture);
    console.log("Bio:", bio);
    console.log("Service Rates:", serviceRates);
    console.log("References:", references);
    console.log("Emergency Contact Name:", emergencyContactName);
    console.log(
      "Emergency Contact Relationship:",
      emergencyContactRelationship
    );
    console.log("Emergency Contact Phone Number:", emergencyContactPhoneNumber);
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
                          placeholder="Rate"
                          name="rate"
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
