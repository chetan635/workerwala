import React, { useEffect, useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import "../../../css/Authentication/workerwala-form-steps/PersonalInformation.css";
import {
  FormLabel,
  Input,
  Heading,
  Divider,
  Select,
  Textarea,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { makeApiCallWithoutBody } from "../../../utils/ApiCallService.js";
import Loading from "../../../components/common/Loading.jsx";

export default function PersonalInformation({
  step,
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
  const [show, setShow] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dobError, setdobError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(null);
  const [isUserNameLoadingState, setIsUserNameLoadingState] = useState(false);
  const [isEmailLoadingState, setIsEmailLoadingState] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);

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

  /**
   * Handle next button click to navigate to next form page
   */
  const handleNext = () => {
    handleNextOrSubmit();
  };

  /**
   * Handle prev button to navigate previous form page
   */
  const handlePrev = () => {
    handlePrevClick();
  };
  return (
    <div className="personal_information_body multistep_form_step_body">
      <div className="personal_information_container multistep_form_step_container">
        <Heading size="lg">Personal details</Heading>
        <Divider />
        <div className="user_name form-item">
          <div className="flex-sb-c">
            <FormLabel>User Name</FormLabel>
            {isUserNameLoadingState ? (
              <p>
                <small>
                  <Loading />
                </small>
              </p>
            ) : isUserNameAvailable === null ? (
              <small></small>
            ) : isUserNameAvailable ? (
              <small className="available">Username is available!</small>
            ) : (
              <small className="exists">Username already exists!!</small>
            )}
          </div>
          <Input
            // isInvalid={isUserNameError}
            errorBorderColor="crimson"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            variant="filled"
            placeholder="User Name"
            id="userName"
          />
        </div>
        <div className="date form-item">
          <FormLabel>Date of Birth</FormLabel>
          <Input
            onChange={(e) => setDate(e.target.value)}
            variant="filled"
            value={date}
            placeholder="Select Date and Time"
            size="md"
            type="date"
          />
        </div>
        <div className="full_name form-item form-item-full">
          <FormLabel>Full Name</FormLabel>
          <Input
            // isInvalid={isUserNameError}
            errorBorderColor="crimson"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            variant="filled"
            placeholder="User Name"
            id="userName"
          />
        </div>
        <div className="email form-item form-item-full">
          <div className="flex-sb-c">
            <FormLabel>Email</FormLabel>
            {isEmailLoadingState ? (
              <p>
                <small>
                  <Loading />
                </small>
              </p>
            ) : isEmailAvailable === null ? (
              <small></small>
            ) : isEmailAvailable ? (
              <small className="available">Email is available!</small>
            ) : (
              <small className="exists">Email Address already exists!!</small>
            )}
          </div>
          <Input
            // isInvalid={isUserNameError}
            errorBorderColor="crimson"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="filled"
            type="email"
            placeholder="Email address"
            id="email"
          />
        </div>
        <div className="phone_number">
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <InputLeftAddon colorScheme="teal">+91</InputLeftAddon>
            <Input
              errorBorderColor="crimson"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              variant="filled"
              id="phone"
              placeholder="Phone number"
            />
          </InputGroup>
        </div>
        <div className="gender_select">
          <FormLabel>Gender</FormLabel>
          <Select
            variant="filled"
            errorBorderColor="crimson"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select option"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="address form-item-full">
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
        </div>
      </div>
      <MultiStepFormNavigation
        handlePrev={handlePrev}
        handleNext={handleNext}
        step={step}
      />
    </div>
  );
}
