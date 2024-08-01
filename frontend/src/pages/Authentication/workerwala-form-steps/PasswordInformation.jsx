import React, { useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Image,
  InputRightElement,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import evaluatePasswordStrength from "../../../utils/EvaluatePassword";
import "../../../css/Authentication/workerwala-form-steps/PasswordInformation.css";
import userAuthenticationView from "../../../assets/images/User-Authentication-view.png";

export default function PasswordInformation({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form data Veridables
   */
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Visiable component veriables
   */
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(evaluatePasswordStrength(value));
    setPasswordError(value === "");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(value !== password);
  };

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
   * Handle the prev click
   */
  const handlePrev = () => {
    handlePrevClick();
  };

  /**
   * Handle the submit click
   */
  const handleSubmit = () => {
    if (password == "") {
      return throwInvalidFormatError(
        "Please add password for you account",
        setPasswordError
      );
    }
    if (confirmPassword == "" || confirmPassword !== password) {
      return throwInvalidFormatError(
        "Confirm password does not match",
        setConfirmPasswordError
      );
    }
    // Add details to form data
    setWorkerWalaInfo((prevState) => ({
      ...prevState,
      password: password,
    }));

    handleNextOrSubmit();
  };

  return (
    <div className="password_information_body multistep_form_step_body">
      <Heading size="md">Add Password</Heading>
      <div className="password_information_container multistep_form_step_container">
        <ChakraProvider>
          <Box p={5} maxWidth="600px" mx="auto">
            <Image src={userAuthenticationView} alt="forgot-password-preview" />
            <VStack spacing={6}>
              <FormControl id="password" isInvalid={passwordError}>
                <HStack justifyContent="space-between" alignItems="center">
                  <FormLabel m={0}>Password</FormLabel>
                  <Text
                    className={"strength" + " " + strength}
                    fontSize="0.8rem"
                    width="10rem"
                    justifyContent="center"
                    color={
                      strength === "Strong"
                        ? "green.500"
                        : strength === "Medium"
                        ? "yellow.500"
                        : "red.500"
                    }
                    fontWeight="bold"
                  >
                    {strength && `Password is ${strength}`}
                  </Text>
                </HStack>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    id="password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    value={password}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl
                id="confirm-password"
                isInvalid={confirmPasswordError}
              >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    id="confirm password"
                    variant="filled"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleConfirmPasswordChange}
                    value={confirmPassword}
                    placeholder="Confirm password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {confirmPasswordError && (
                  <Text mt={2} color="red.500">
                    Passwords do not match
                  </Text>
                )}
              </FormControl>
            </VStack>
          </Box>
        </ChakraProvider>
      </div>
      <MultiStepFormNavigation
        handlePrev={handlePrev}
        handleNext={handleSubmit}
        step={step}
      />
    </div>
  );
}
