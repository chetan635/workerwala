import React from "react";
import { Heading, Image } from "@chakra-ui/react";
import WorkerWalaLogoImage from "../../assets/images/WorkerWala-logo-2.png";
import "../../css/common/WorkerWalaLogo.css"

export default function WorkerWalaLogo() {
  return (
    <div className="logo flex">
      {" "}
      <Image
        boxSize="70px"
        objectFit="cover"
        src={WorkerWalaLogoImage}
        alt="WorkerWala logo"
      />{" "}
      <div className="logo-details">
      <Heading className="logoHeading" size="lg">WorkerWala</Heading>
      <Heading className="logoHeading" size="sm">Get it done!</Heading>
      </div>
    </div>
  );
}
