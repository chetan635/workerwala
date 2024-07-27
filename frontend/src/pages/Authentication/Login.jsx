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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import WorkerWalaLogo from "../../components/common/WorkerWalaLogo";

export default function Login() {
  const auth = Auth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleClick = () => setShow(!show);

  // Method to handle submit form changes for login
  const handleSubmit = async () => {
    setIsLoading(true);
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
        title: `Please enter valid password`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsPasswordError(false),
      });
      setIsLoading(false);
      return;
    }

    if (userName != "" && password != "") {
      try {
        /**
         * Make API call to login user with provided credentials
         */
        await auth.loginUser({
          username: userName,
          password: password,
        });
      } catch (error) {
        toast({
          title: `Authentication failed due to reason: ${error}`,
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
      }

      // Reset the userName and passowd
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div className="login_body">
      <div className="login_container flex flex-r flex-dir-c">
        <WorkerWalaLogo />
        <div className="login_form flex-c flex-dir-c">
          <div className="heading">
            <Heading size="md">Login to Your Account </Heading>
            <p>
              Don't have account,{" "}
              <ChakraLink
                className="chakra-link"
                color="teal.500"
                as={ReactRouterLink}
                to="/choose-user-type"
              >
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
                  {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Link className="flex forgot-password-link" to="/forgot-password">
            Forgot password
          </Link>
          <Button
            isLoading={isLoading}
            onClick={() => handleSubmit()}
            colorScheme="teal"
            size="lg"
          >
            LOGIN
          </Button>
        </div>
      </div>
    </div>
  );
}
