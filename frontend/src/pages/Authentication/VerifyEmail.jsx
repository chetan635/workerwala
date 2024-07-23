import React, { useState } from "react";
import "../../css/Authentication/VerifyEmail.css";
import { useLocation } from "react-router-dom";
import { Heading, Image, useToast, Button } from "@chakra-ui/react";
import mailView from "../../assets/images/Email_verify_mail_2.png";
import { Icon } from "@iconify/react";
import { makeApiCallWithoutBody } from "../../utils/ApiCallService";

export default function VerifyEmail() {
  const location = useLocation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const email = location.state;

  const handleResendVerificationLink = async () => {
    setIsLoading(true);
    /**
     * Make API call to resend the verification link to the user to verify email address
     */
    const response = await makeApiCallWithoutBody(
      "POST",
      `auth/resend-verification-link?email=${email}`
    ).then((res) => res.json());

    if (response.status == "success") {
      toast({
        title: `We have sent verification link on ${email}, please recheck your mail`,
        status: "success",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: `${response.message}`,
      status: "error",
      isClosable: true,
    });
    setIsLoading(false);
  };

  return (
    <div className="verify_email_body">
      <div className="verify_email_container">
        <Image width="250px" height="230px" src={mailView} alt="mail" />
        <Heading as="h3" size="md">
          Please verify your Email Address
        </Heading>
        <p>
          We have sent mail on <b>{email}</b> to verify your mail account.
        </p>
        <p>
          Please verify this email adddress by clicking on provided <b>link</b>{" "}
          in sent mail
        </p>
        {email ? (
          <Button
            isLoading={isLoading}
            onClick={() => handleResendVerificationLink()}
            colorScheme="teal"
            size="lg"
          >
            <p>
              <Icon icon="mdi:email-resend" />
            </p>{" "}
            &nbsp; <span>Re-send link</span>
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
