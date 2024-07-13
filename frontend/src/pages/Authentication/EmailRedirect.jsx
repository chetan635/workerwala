import React, { useEffect, useState } from "react";
import { authConstants } from "../../constants/AuthConstants";
import Loading from "../../components/common/Loading";
import { useParams } from "react-router-dom";
import VerificationFail from "../../components/Authentication/VerificationFail";
import VerificationSuccess from "../../components/Authentication/VerificationSuccess";

export default function EmailRedirect() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationToken } = useParams();

  const verifyMail = async () => {
    // Request to confirm the account
    const emailVerification = await fetch(
      `${authConstants.dataBaseServer}/auth/confirm-account?token=${verificationToken}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "*",
        },
      }
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
