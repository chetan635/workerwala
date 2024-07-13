import React from "react";
import verifySuccess from "../../assets/images/verified-mail-icon.png";
import { useNavigate } from "react-router-dom";
import '../../css/Authentication/VerificationSuccess.css';
import { Image, Heading, Button } from "@chakra-ui/react";

export default function VerificationSuccess() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <div className="verification_success_body">
        <div className="verification_success_container">
          <Image boxSize="90px" src={verifySuccess} alt="mail" />
          <Heading as="h3" size="lg">
            Email verification Successful
          </Heading>
          <div className="content">
            <p>
              Thank you for your support, we have successfully verified your
              mail.
            </p>
            <p>You can now procceed.</p>
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
