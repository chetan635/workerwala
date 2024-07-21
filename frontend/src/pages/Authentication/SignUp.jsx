import React, { useEffect } from "react";
import "../../css/Authentication/SignUp.css";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";
import evaluatePasswordStrength from "../../utils/EvaluatePassword.js";
import Loading from "../../components/common/Loading.jsx";
import WorkerWalaLogo from "../../components/common/WorkerWalaLogo.jsx";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { makeApiCallWithoutBody } from "../../utils/ApiCallService.js";

export default function SignUp() {
  // Declearing the hooks.
  const toast = useToast();
  const navigate = useNavigate();
  const [strength, setStrength] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [show, setShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isUserNameLoadingState, setIsUserNameLoadingState] = useState(false);
  const [isEmailLoadingState, setIsEmailLoadingState] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const auth = Auth();

  const handleClick = () => setShow(!show);
  const handleConfirmPassShowClick = () => setShowConfirmPass(!showConfirmPass);

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
      setIsAvailable(null);
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

      setIsAvailable(!response.data);
    } catch (error) {
      setIsAvailable(false);
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

  function resetForm() {
    setUserName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  }

  // Method to handle submit form changes for signup
  const handleSubmit = async () => {
    setIsLoading(true);
    if (email === "" || email.includes("@") == false) {
      setIsEmailError(true);
      toast({
        title: `Please enter valid email address`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsEmailError(false),
      });
      setIsLoading(false);
      return;
    }

    if (userName === "") {
      setIsUserNameError(true);
      toast({
        title: `Please enter valid user name`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsUserNameError(false),
      });
      setIsLoading(false);
      return;
    }

    if (password === "") {
      setIsPasswordError(true);
      toast({
        title: `please enter valid password`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsPasswordError(false),
      });
      setIsLoading(false);
      return;
    }

    if (confirmPassword === "" || confirmPassword != password) {
      setIsConfirmPasswordError(true);
      toast({
        title: `Passwords does not match or invalid`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsConfirmPasswordError(false),
      });
      setIsLoading(false);
      return;
    }

    if (
      userName != "" &&
      password != "" &&
      email != "" &&
      confirmPassword != ""
    ) {
      // API Request to the "/auth/register" route in backend to register the user.
      try {
        const signUpResponse = await auth.SignUpUser({
          username: userName,
          password: password,
          email: email,
          role: "user",
          isEnabled: false,
        });
        if (signUpResponse.status == "success") {
          toast({
            title: signUpResponse.message,
            status: "success",
            isClosable: true,
          });
          navigate("/verify-email", { state: email });
        } else {
          toast({
            title: signUpResponse.message,
            status: "error",
            isClosable: true,
          });
          setIsLoading(false);
        }
      } catch (error) {
        toast({
          title: `Something went wrong while creating the accout, Please retry`,
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
      }

      resetForm();
    }
  };
  return (
    <div>
      <div className="signup_body">
        <div className="signup_container flex flex-r flex-dir-c">
          <WorkerWalaLogo />
          <div className="signup_form flex-c flex-dir-c">
            <div className="heading">
              <Heading size="md">Sign Up</Heading>
              <p>
                Already got an account ?{" "}
                <ChakraLink color="teal.500" as={ReactRouterLink} to="/login">
                  Login
                </ChakraLink>{" "}
              </p>
            </div>
            <FormControl>
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
                  <small className="exists">
                    Email Address already exists!!
                  </small>
                )}
              </div>
              <Input
                isInvalid={isEmailError}
                errorBorderColor="crimson"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                variant="filled"
                placeholder="Email"
                id="email"
              />
              <div className="flex-sb-c">
                <FormLabel>User Name</FormLabel>
                {isUserNameLoadingState ? (
                  <p>
                    <small>
                      <Loading />
                    </small>
                  </p>
                ) : isAvailable === null ? (
                  <small></small>
                ) : isAvailable ? (
                  <small className="available">Username is available!</small>
                ) : (
                  <small className="exists">Username already exists!!</small>
                )}
              </div>
              <Input
                isInvalid={isUserNameError}
                errorBorderColor="crimson"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                variant="filled"
                placeholder="User Name"
                id="userName"
              />
              <div className="passwordBlock flex-sa-c">
                <FormLabel>Password</FormLabel>
                <small className={strength}>
                  <b>{strength}</b>
                </small>
              </div>
              <InputGroup size="md">
                <Input
                  isInvalid={isPasswordError}
                  errorBorderColor="crimson"
                  pr="4.5rem"
                  variant="filled"
                  type={show ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setStrength(evaluatePasswordStrength(e.target.value));
                  }}
                  value={password}
                  placeholder="Enter password"
                  id="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => handleClick()}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  isInvalid={isConfirmPasswordError}
                  errorBorderColor="crimson"
                  pr="4.5rem"
                  variant="filled"
                  type={showConfirmPass ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  id="confirm password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleConfirmPassShowClick()}
                  >
                    {showConfirmPass ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              isLoading={isloading}
              onClick={() => handleSubmit()}
              colorScheme="teal"
              size="lg"
            >
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
