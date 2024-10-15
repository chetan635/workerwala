import React from "react";
import "../../../css/home/components/IntroductionSection.css";
import { Button, Image } from "@chakra-ui/react";
import workerFrontImage from "../../../assets/images/Worker-front-image.png";

export default function IntroductionSection() {
  return (
    <div>
      <div className="Introduction-section">
        <div className="left">
          <Image
            data-aos="zoom-in"
            className="workerImage"
            src={workerFrontImage}
            alt="Dan Abramov"
          />
        </div>
        <div className="right">
          <div className="Introduction-section-heading">
            <h1>The easy, reliable way to take care of your home!!</h1>
          </div>
          <div className="Introduction-section-headingV2">
            "Whatever your needs, Workerwala connects you with skilled
            professionals to get the job done right. From home services to
            specialized trades, we ensure quality work that makes your life
            easier."
          </div>
          <Button
            onClick={() => navigate("/login")}
            colorScheme="teal"
            variant="outline"
            width="15rem"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
