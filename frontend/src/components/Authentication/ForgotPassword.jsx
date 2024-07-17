import React from "react";
import {
  Image,
  Heading,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { EmailIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import forgotPasswordPreview from "../../assets/images/forgot-password-preview-2.png";
import "../../css/Authentication/ForgotPassword.css";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="forgot-password-body">
      <div className="flex-c flex-dir-c forgot-password-container">
        <Image
          height="130px"
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
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Email" />
        </InputGroup>
        <Button className="button" colorScheme="green">LOGIN</Button>
        <small className="back-to-login">
            <Link to="/login"><ChevronLeftIcon color="teal"/> Back to Login</Link>
        </small>
      </div>
    </div>
  );
}
