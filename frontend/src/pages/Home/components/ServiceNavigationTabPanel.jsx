import { Heading } from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "../../../css/home/components/ServiceNavigationTabPanel.css";

export default function ServiceNavigationTabPanel({
  image: image,
  title: title,
  messageItem_1: messageItem_1,
  messageItem_2: messageItem_2,
  backgroundColor: backgroundColor,
}) {
  return (
    <div className="service-tab-panal">
      <div
        style={{ backgroundColor: backgroundColor }}
        className="service-tab-panal-outer-container"
      >
        <div className="service-tab-image-container">
          <img className="service-tab-panal-image" src={image} alt="" />
        </div>
        <div className="service-tab-panal-inner-box" data-aos="zoom-in">
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <div className="box-message">
            <span>
              <Icon icon="icon-park-solid:correct" />
            </span>
            <p>{messageItem_1}</p>
          </div>
          <div className="box-message">
            <span>
              <Icon icon="icon-park-solid:correct" />
            </span>
            <p>{messageItem_2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
