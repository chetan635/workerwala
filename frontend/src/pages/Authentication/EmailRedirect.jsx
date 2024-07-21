import React, { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import { useParams } from "react-router-dom";
import VerificationFail from "../../components/Authentication/VerificationFail";
import VerificationSuccess from "../../components/Authentication/VerificationSuccess";
import { makeApiCallWithoutBody } from "../../utils/ApiCallService";

export default function EmailRedirect() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationToken } = useParams();

  const verifyMail = async () => {
    /**
     * Api Call to confirm the new created account
     */
    const emailVerification = await makeApiCallWithoutBody(
      "POST",
      `auth/confirm-account?token=${verificationToken}`
    ).then((res) => res.json());

    if (emailVerification.status == "success") {
      setIsSuccess(true);
      setIsLoading(false);
    } else if (emailVerification.status == "failure") {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    verifyMail();
    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return <>{isSuccess ? <VerificationSuccess /> : <VerificationFail />}</>;
}
