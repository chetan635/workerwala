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
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Login() {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleClick = () => setShow(!show);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Method to handle submit form changes for login
  const handleSubmit = () => {
    if (userName === "") {
      setIsUserNameError(true);
      toast({
        title: `Please enter valid user name`,
        status: "error",
        isClosable: true,
      });
    } else {
      setIsUserNameError(false);
    }

    if (password === "") {
      setIsPasswordError(true);
      toast({
        title: `please enter valid password`,
        status: "error",
        isClosable: true,
      });
    } else {
      setIsPasswordError(false);
    }

    if (userName != "" && password != "") {
      // Do some login related API calls

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
            <p>Don't have account, Create Account</p>
          </div>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              isInvalid={isUserNameError}
              errorBorderColor="crimson"
              onChange={(e) => handleUsernameChange(e)}
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
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                placeholder="Enter password"
                id="password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={()=>handleClick()}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button onClick={() => handleSubmit()} colorScheme="teal" size="lg">
            LOGIN
          </Button>
          <Button
            leftIcon={<Icon icon="flat-color-icons:google" />}
            variant="solid"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
