import React from "react";
import "../../css/Authentication/Login.css";
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

export default function Login() {
  const auth = Auth();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleClick = () => setShow(!show);

  // Method to handle submit form changes for login
  const handleSubmit = async () => {
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

    if (userName != "" && password != "") {
      // Do some login related API calls
      try {
        await auth.loginUser({
          username: userName,
          password: password,
        });
      } catch (error) {
        toast({
          title: `Something went wrong, try logging again`,
          status: "error",
          isClosable: true,
        });
      }

      // Reset the userName and passowd
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div className="login_body">
      <div className="login_container flex flex-r">
        <div className="login_form flex-c flex-dir-c">
          <div className="heading">
            <Heading>Login to Your Account </Heading>
            <p>
              Don't have account,{" "}
              <ChakraLink color="teal.500" as={ReactRouterLink} to="/signUp">
                Create Account
              </ChakraLink>{" "}
            </p>
          </div>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              isInvalid={isUserNameError}
              errorBorderColor="crimson"
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
          </FormControl>
          <Button onClick={() => handleSubmit()} colorScheme="teal" size="lg">
            LOGIN
          </Button>
          <div className="sign-up-options-heading">
            or, Login with these services
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
                <Icon icon="fa6-brands:x-twitter" style={{ color: "black" }} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
