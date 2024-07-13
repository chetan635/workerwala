import React from "react";
import verifyFail from "../../assets/images/verify-failed.png";
import { useNavigate } from "react-router-dom";
import "../../css/Authentication/VerificationFail.css";
import { Image, Heading, Button } from "@chakra-ui/react";

export default function VerificationFail() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="verification_fail_body">
        <div className="verification_fail_container">
          <Image boxSize="90px" src={verifyFail} alt="mail" />
          <Heading className="red" as="h3" size="lg">
            Email Verification Failed
          </Heading>
          <div className="content">
            <p>
              Sorry, We are having trouble verifing your
              account
            </p>
            <p>Please try again with different account.</p>
          </div>
          <Button
            onClick={() => handleClick()}
            colorScheme="teal"
            variant="solid"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
