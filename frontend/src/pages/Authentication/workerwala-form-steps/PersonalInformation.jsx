import React, { useEffect, useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import "../../../css/Authentication/workerwala-form-steps/PersonalInformation.css";
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  Heading,
  Text,
  Spinner,
  useToast,
  VStack,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { makeApiCallWithoutBody } from "../../../utils/ApiCallService.js";
import Loading from "../../../components/common/Loading.jsx";

export default function PersonalInformation({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form Data Veriables
   */
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  /**
   * Visible component variables
   */
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(null);
  const [isUserNameLoadingState, setIsUserNameLoadingState] = useState(false);
  const [isEmailLoadingState, setIsEmailLoadingState] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const toast = useToast();

  /**
   * Methods to validate if the userName and email are present to use
   */
  // Debounce function to limit the number of API calls
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to check username availability
  const checkUsernameAvailability = async (userName) => {
    if (userName.trim() === "") {
      setIsUserNameAvailable(null);
      setIsUserNameLoadingState(null);
      return;
    }
    setIsUserNameLoadingState(true);
    try {
      /**
       * API call to verify if user name already exists
       */
      const response = await makeApiCallWithoutBody(
        "GET",
        `auth/check-username?username=${userName}`
      ).then((res) => res.json());

      setIsUserNameAvailable(!response.data);
    } catch (error) {
      setIsUserNameAvailable(false);
    } finally {
      setIsUserNameLoadingState(false);
    }
  };

  // Function to check Email availability
  const checkEmailAvailability = async (email) => {
    if (email.trim() === "") {
      setIsEmailAvailable(null);
      setIsEmailLoadingState(false);
      return;
    }
    if (!email.includes("@")) {
      setIsEmailAvailable(null);
      return;
    }
    setIsEmailLoadingState(true);
    try {
      /**
       * API call to verify if email already exists
       */
      const response = await makeApiCallWithoutBody(
        "GET",
        `auth/check-useremail?email=${email}`
      ).then((res) => res.json());

      setIsEmailAvailable(!response.data);
    } catch (error) {
      setIsEmailAvailable(false);
    } finally {
      setIsEmailLoadingState(false);
    }
  };

  // Debounced version of the check function
  const debouncedCheckUserName = debounce(checkUsernameAvailability, 500);
  const debouncedCheckEmail = debounce(checkEmailAvailability, 500);

  // Effect to trigger the username check
  useEffect(() => {
    debouncedCheckUserName(userName);
  }, [userName]);

  // Effect to trigger the username check
  useEffect(() => {
    debouncedCheckEmail(email);
  }, [email]);

  // Phone Number validate function
  function validatePhoneNumber(phoneNumber) {
    const regex = /^[0-9]+$/;
    return regex.test(phoneNumber);
  }

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
   * Handle next button click to navigate to next form page
   */
  const handleNext = () => {
    // Handle all the validation in this to avoid any error in data
    if (userName == "" || isUserNameAvailable == false) {
      return throwInvalidFormatError(
        "Please use valid user name",
        setUserNameError
      );
    }
    if (
      email == "" ||
      isEmailAvailable == false ||
      email.includes("@") == false
    ) {
      return throwInvalidFormatError(
        `Please use approprate email`,
        setEmailError
      );
    }
    if (date == "") {
      return throwInvalidFormatError(
        `Please select the date of birth`,
        setDobError
      );
    }
    if (fullName == "") {
      return throwInvalidFormatError(
        "Please enter the valid full name",
        setFullNameError
      );
    }
    if (
      phoneNumber == "" ||
      !validatePhoneNumber(phoneNumber) ||
      phoneNumber.length != 10
    ) {
      return throwInvalidFormatError(
        "Please add the valid phone number",
        setPhoneError
      );
    }
    if (gender == "") {
      return throwInvalidFormatError(
        "Please select your gender",
        setGenderError
      );
    }
    if (address == "") {
      return throwInvalidFormatError(
        "Please add your address",
        setAddressError
      );
    }

    // Add details to form data
    setWorkerWalaInfo({
      ...workerWalaInfo,
      userName: userName,
      email: email,
      dataOfBirth: date,
      fullName: fullName,
      phoneNumber: phoneNumber,
      gender: gender,
      address: address,
    });
    handleNextOrSubmit();
  };

  /**
   * Handle prev button to navigate previous form page
   */
  const handlePrev = () => {
    handlePrevClick();
  };
  return (
    <ChakraProvider>
      <Box
        className="personal_information_body multistep_form_step_body"
        p={5}
        mx="auto"
      >
        <Heading size="lg" mb={5}>
          Personal details
        </Heading>
        <VStack
          className="personal_information_container multistep_form_step_container"
          spacing={5}
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
            w="100%"
          >
            <GridItem>
              <FormControl
                className="user_name form-item"
                isInvalid={userNameError}
              >
                <HStack justifyContent="space-between">
                  <FormLabel>User Name</FormLabel>
                  {isUserNameLoadingState ? (
                    <Text as="small">
                      <Spinner size="sm" />
                    </Text>
                  ) : isUserNameAvailable === null ? (
                    <Text as="small"></Text>
                  ) : isUserNameAvailable ? (
                    <Text as="small" className="available">
                      Username is available!
                    </Text>
                  ) : (
                    <Text as="small" className="exists">
                      Username already exists!!
                    </Text>
                  )}
                </HStack>
                <Input
                  errorBorderColor="crimson"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  variant="filled"
                  placeholder="User Name"
                  id="userName"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl className="date form-item" isInvalid={dobError}>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  onChange={(e) => setDate(e.target.value)}
                  variant="filled"
                  value={date}
                  placeholder="Select Date"
                  size="md"
                  type="date"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                className="full_name form-item form-item-full"
                isInvalid={fullNameError}
              >
                <FormLabel>Full Name</FormLabel>
                <Input
                  errorBorderColor="crimson"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  variant="filled"
                  placeholder="Full Name"
                  id="fullName"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                className="email form-item form-item-full"
                isInvalid={emailError}
              >
                <HStack justifyContent="space-between">
                  <FormLabel>Email</FormLabel>
                  {isEmailLoadingState ? (
                    <Text as="small">
                      <Spinner size="sm" />
                    </Text>
                  ) : isEmailAvailable === null ? (
                    <Text as="small"></Text>
                  ) : isEmailAvailable ? (
                    <Text as="small" className="available">
                      Email is available!
                    </Text>
                  ) : (
                    <Text as="small" className="exists">
                      Email Address already exists!!
                    </Text>
                  )}
                </HStack>
                <Input
                  errorBorderColor="crimson"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="filled"
                  type="email"
                  placeholder="Email address"
                  id="email"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl className="phone_number" isInvalid={phoneError}>
                <FormLabel>Phone</FormLabel>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input
                    errorBorderColor="crimson"
                    pattern="[0-9]+"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    variant="filled"
                    id="phone"
                    placeholder="Phone number"
                  />
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl className="gender_select" isInvalid={genderError}>
                <FormLabel>Gender</FormLabel>
                <Select
                  errorBorderColor="crimson"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  variant="filled"
                  placeholder="Select option"
                  id="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl
                className="address form-item-full"
                isInvalid={addressError}
              >
                <FormLabel>Address</FormLabel>
                <Textarea
                  errorBorderColor="crimson"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="filled"
                  resize="none"
                  size="md"
                  id="address"
                  placeholder="Please add complete address"
                />
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
        <MultiStepFormNavigation
          handlePrev={handlePrev}
          handleNext={handleNext}
          step={step}
        />
      </Box>
    </ChakraProvider>
  );
}
