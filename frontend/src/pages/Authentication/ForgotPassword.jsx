import React, { useState } from "react";
import {
  Image,
  Heading,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import forgotPasswordPreview from "../../assets/images/forgot-password-preview-3.png";
import "../../css/Authentication/ForgotPassword.css";
import { Link } from "react-router-dom";
import SentForgotPassLink from "../../components/Authentication/SentForgotPassLink.jsx";
import { makeApiCallWithoutBody } from "../../utils/ApiCallService.js";

export default function ForgotPassword() {
  const [isEmailError, setIsEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();
  const [isMailSentSuccessfully, setIsMailSentSuccessfully] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePasswordClick = async () => {
    setIsLoading(true);
    
    /**
     * Api call to to start the reset-password process and send mail to verify the account.
     */
    const changePasswordResponse = await makeApiCallWithoutBody(
      "POST",
      `auth/reset-password?email=${email}`
    )
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

    if (changePasswordResponse.status == "failure") {
      setIsEmailError(true);
      toast({
        title: changePasswordResponse.message,
        status: "error",
        isClosable: true,
        onCloseComplete: () => setIsEmailError(false),
      });
      setIsLoading(false);
      return;
    }
    setIsMailSentSuccessfully(true);
    setIsLoading(false);
  };

  return (
    <div className="forgot-password-body">
      <div className="flex-c flex-dir-c forgot-password-container">
        {!isMailSentSuccessfully ? (
          <>
            <Image
              height="170px"
              width="170px"
              src={forgotPasswordPreview}
              alt="forgot-password-preview"
            />
            <Heading as="h1" size="md">
              Forgot password
            </Heading>
            <p className="flex-c-c content">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.500" />
              </InputLeftElement>
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
            </InputGroup>
            <Button
              onClick={() => {
                handleChangePasswordClick();
              }}
              isLoading={isLoading}
              className="button"
              colorScheme="green"
            >
              Submit
            </Button>
          </>
        ) : (
          <SentForgotPassLink email={email} />
        )}
        <small className="back-to-login">
          <Link to="/login">
            <ChevronLeftIcon color="teal" /> Back to Login
          </Link>
        </small>
      </div>
    </div>
  );
}
