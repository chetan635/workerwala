import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import forgotPasswordPreview from "../../assets/images/forgot-password-preview-2.png";

export default function SentForgotPassLink(data) {
  return (
    <div className="sentForgotpassLink-container flex-c-c flex-dir-c">
      <Image
        height="130px"
        width="170px"
        src={forgotPasswordPreview}
        alt="forgot-password-preview"
      />
      <Heading as="h3" size="md">
        Please check your Email for further steps.
      </Heading>
      <p>
        We have sent mail on <b>{data.email}</b> to verify your mail account.
      </p>
      <p>
        Please verify this email adddress by clicking on provided <b>link</b> in
        sent mail, and continue with change password process.
      </p>
    </div>
  );
}
