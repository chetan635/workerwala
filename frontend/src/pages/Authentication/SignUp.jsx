import React from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";

export default function SignUp() {
  const toast = useToast();
  const [show, setShow] = useState(false);
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

  function resetForm() {
    setUserName("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  }

  // Method to handle submit form changes for signup
  const handleSubmit = async () => {
    if (email === "" || email.includes("@") == false) {
      setIsEmailError(true);
      toast({
        title: `Please enter valid email address`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsEmailError(false),
      });
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
          isEnabled: false
        });
        if (signUpResponse.status == "success") {
          toast({
            title: signUpResponse.message,
            status: "success",
            isClosable: true,
          });
        } else {
          toast({
            title: signUpResponse.message,
            status: "error",
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: `Something went wrong while creating the accout, Please retry`,
          status: "error",
          isClosable: true,
        });
      }

      resetForm();
    }
  };
  return (
    <div>
      <div className="signup_body">
        <div className="signup_container flex flex-r">
          <div className="signup_form flex-c flex-dir-c">
            <div className="heading">
              <Heading>Sign Up</Heading>
              <p>
                Already got an account ?{" "}
                <ChakraLink color="teal.500" as={ReactRouterLink} to="/login">
                  Login
                </ChakraLink>{" "}
              </p>
            </div>
            <FormControl>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>User Name</FormLabel>
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
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  isInvalid={isPasswordError}
                  errorBorderColor="crimson"
                  pr="4.5rem"
                  variant="filled"
                  type={show ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                  id="password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => handleClick()}>
                    {show ? "Hide" : "Show"}
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
                    {showConfirmPass ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button onClick={() => handleSubmit()} colorScheme="teal" size="lg">
              SIGN UP
            </Button>
            <div className="sign-up-options-heading">
              or, Sign up with these services
            </div>
            <div className="icon_buttons flex-c-c">
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                aria-label="Done"
                fontSize="25px"
                icon={<Icon icon="flat-color-icons:google" />}
              />
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                aria-label="Done"
                fontSize="25px"
                icon={<Icon icon="logos:facebook" />}
              />
              <IconButton
                isRound={true}
                variant="solid"
                colorScheme="gray"
                aria-label="Done"
                fontSize="25px"
                icon={
                  <Icon
                    icon="fa6-brands:x-twitter"
                    style={{ color: "black" }}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
