import React, { useState } from "react";
import {
  Image,
  Heading,
  Button,
  InputGroup,
  InputRightElement,
  Input,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import forgotPasswordPreview from "../../assets/images/forgot-password-preview-3.png";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../../css/Authentication/ChangePassword.css";
import { useNavigate, useParams } from "react-router-dom";
import evaluatePasswordStrength from "../../utils/EvaluatePassword";
import { makeApiCall } from "../../utils/ApiCallService.js";

export default function ChangePassword() {
  const toast = useToast();
  const [strength, setStrength] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const { verificationToken } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (password == "") {
      setIsPasswordError(true);
      toast({
        title: `Please enter new password to continue`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsPasswordError(false),
      });
      return;
    } else if (confirmPassword == "") {
      setIsConfirmPasswordError(true);
      toast({
        title: `Please enter confirm password to continue`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsConfirmPasswordError(false),
      });
      return;
    }

    if (password != confirmPassword) {
      setIsConfirmPasswordError(true);
      toast({
        title: `Please check if both passwords are correct.`,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsConfirmPasswordError(false),
      });
      return;
    }

    setIsLoading(true);
    /**
     * Make the API call to change the password
     */
    const response = await makeApiCall("POST", "auth/change-password", {
      token: verificationToken,
      newPassword: password,
    })
      .then((res) => res.json())
      .catch(() => {
        toast({
          title: "Something went wrong, please retry again.",
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
        return;
      });

    if (response.status == "failure") {
      toast({
        title: response.message,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: response.message,
      status: "success",
      isClosable: true,
    });
    setIsLoading(false);
    navigate("/login");
  };

  const handlePasswordShowClick = () => setPasswordShow(!passwordShow);
  const handleConfirmPasswordShowClick = () =>
    setConfirmPasswordShow(!confirmPasswordShow);
  return (
    <div>
      <div className="change-password-body">
        <div className="flex-c flex-dir-c change-password-container">
          <Image
            height="170px"
            width="170px"
            src={forgotPasswordPreview}
            alt="change-password-preview"
          />
          <Heading as="h1" size="md">
            Change password
          </Heading>
          <p className="flex-c-c content">
            Please add new approprate password for your account
          </p>
          <div className="passwordBlock flex-sa-c">
            <FormLabel>Password</FormLabel>
            <small className={strength + " " + "strength"}>
              {strength != "" ? <b>Password is {strength}</b> : ""}
            </small>
          </div>
          <InputGroup size="md">
            <Input
              isInvalid={isPasswordError}
              errorBorderColor="crimson"
              pr="4.5rem"
              variant="filled"
              type={passwordShow ? "text" : "password"}
              onChange={(e) => {
                handlePasswordChange(e);
                setStrength(evaluatePasswordStrength(e.target.value));
              }}
              value={password}
              placeholder="New Password"
              id="password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => handlePasswordShowClick()}
              >
                {passwordShow ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <div className="passwordBlock">
            <FormLabel>Confirm Password</FormLabel>
          </div>
          <InputGroup size="md">
            <Input
              isInvalid={isConfirmPasswordError}
              errorBorderColor="crimson"
              pr="4.5rem"
              variant="filled"
              type={confirmPasswordShow ? "text" : "password"}
              onChange={(e) => {
                handleConfirmPasswordChange(e);
              }}
              value={confirmPassword}
              placeholder="Confirm password"
              id="confirm password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => handleConfirmPasswordShowClick()}
              >
                {confirmPasswordShow ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            isLoading={isLoading}
            className="button"
            colorScheme="green"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
