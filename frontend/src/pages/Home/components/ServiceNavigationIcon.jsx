import { Tab } from "@chakra-ui/react";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ServiceNavigationIcon({icon, name}) {
  return (
    <div>
      <Tab className="service-navigation-tab">
        {" "}
        <div className="service-navigation-tab-icon">
          <Icon
            className="service-navigation-icon"
            height="2rem"
            icon={icon}
          />
        </div>{" "}
        {name}
      </Tab>
    </div>
  );
}
