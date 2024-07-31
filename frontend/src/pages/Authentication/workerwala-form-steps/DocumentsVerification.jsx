import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import "../../../css/Authentication/workerwala-form-steps/DocumentsVerification.css";

export default function DocumentsVerification({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form data Veridables
   */
  const [governmentId, setGovernmentId] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [professionalLicense, setProfessionalLicense] = useState(null);

  /**
   * Visiable componet veriables
   */
  const toast = useToast();
  const [governmentIdError, setGovernmentIdError] = useState(false);
  const [proofOfAddressError, setProofOfAddressError] = useState(false);
  const [professionalLicenseError, setProfessionalLicenseError] =
    useState(false);

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
   * Handle prev button click
   */
  const handlePrev = () => {
    handlePrevClick();
  };

  /**
   * Handle next button click
   */
  const handleNext = () => {
    // Validate the form
    if (governmentId == null) {
      return throwInvalidFormatError(
        "Please add government ID for revification",
        setGovernmentIdError
      );
    }
    if (proofOfAddress == null) {
      return throwInvalidFormatError(
        "Please add some proof of address",
        setProofOfAddressError
      );
    }
    if (professionalLicense == null) {
      return throwInvalidFormatError(
        "Please add prfessional documents",
        setProfessionalLicenseError
      );
    }
    // Add details to form data
    setWorkerWalaInfo({
      ...workerWalaInfo,
      governmentId: governmentId,
      proofOfAddress: proofOfAddress,
      professionalLicense: professionalLicense,
    });
    handleNextOrSubmit();
  };

  /**
   * Handle File change
   */
  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="document_verification_body multistep_form_step_body">
      <Heading size="lg">Document Verification</Heading>
      <div className="document_verification_container multistep_form_step_container">
        <ChakraProvider>
          <Box p={5}>
            <Text fontSize="lg" mb={6} textAlign="center" color="gray.600">
              Please upload the required verification documents below.
            </Text>
            <VStack spacing={6}>
              <FormControl isInvalid={governmentIdError} id="government-id">
                <FormLabel padding="1rem 0px">
                  <Flex gap="5px" alignItems="center">
                    <Icon height="15px" icon="fa:id-card" />
                    Government ID
                  </Flex>
                </FormLabel>
                <Input
                  type="file"
                  padding="4px"
                  onChange={(event) => handleFileChange(event, setGovernmentId)}
                  borderColor="teal.500"
                  height="60px"
                />
              </FormControl>

              <FormControl
                isInvalid={proofOfAddressError}
                id="proof-of-address"
              >
                <FormLabel padding="1rem 0px">
                  <Flex gap="5px" alignItems="center">
                    <Icon height="25px" icon="mdi:location" />
                    Proof of Address
                  </Flex>
                </FormLabel>
                <Input
                  padding="4px"
                  type="file"
                  onChange={(event) =>
                    handleFileChange(event, setProofOfAddress)
                  }
                  height="60px"
                  borderColor="teal.500"
                />
              </FormControl>
              <FormControl
                isInvalid={professionalLicenseError}
                id="professional-license"
              >
                <FormLabel padding="1rem 0px">
                  <Flex gap="5px" alignItems="center">
                    <Icon height="20px" icon="bxs:certification" />
                    Professional License/Certification Documents
                  </Flex>
                </FormLabel>
                <Input
                  padding="4px"
                  type="file"
                  onChange={(event) =>
                    handleFileChange(event, setProfessionalLicense)
                  }
                  height="60px"
                  borderColor="teal.500"
                />
              </FormControl>
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
