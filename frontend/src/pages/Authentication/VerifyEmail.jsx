import React from 'react'
import "../../css/Authentication/VerifyEmail.css"
import { useParams } from 'react-router-dom'

export default function VerifyEmail() {
    const {verificationToken} = useParams();
  return (
      <div className="verify_email_body">
        <div className="verify_email_container">
            {verificationToken}
        </div>
      </div>
  )
}
