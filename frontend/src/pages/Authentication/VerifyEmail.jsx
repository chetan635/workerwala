import React from "react";
import "../../css/Authentication/VerifyEmail.css";
import { useLocation } from "react-router-dom";
import { Heading, Image } from "@chakra-ui/react";
import mailView from "../../assets/images/Email_Verify_mail.png";

export default function VerifyEmail() {
  const location = useLocation();
  const email = location.state;
  return (
    <div className="verify_email_body">
      <div className="verify_email_container">
        <Image boxSize="200px" src={mailView} alt="mail" />
        <Heading as="h3" size="md">
          Please Verify Your Email Address
        </Heading>
        <p>
          We have sent mail on <b>{email}</b> to verify your mail account.
        </p>
        <p>
          Please verify this email adddress by clicking on provided <b>link</b>{" "}
          in sent mail
        </p>
      </div>
    </div>
  );
}
