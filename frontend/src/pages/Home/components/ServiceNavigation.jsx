import {
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import "../../../css/home/components/ServiceNavigation.css";
import MovingWorker from "../../../assets/images/moving-worker-image.jpeg";
import MountingWorker from "../../../assets/images/mounting-worker-image.jpg";
import AssemblyWorker from "../../../assets/images/assembly-worker-image.jpg";
import CleaningWorker from "../../../assets/images/cleaning-worker-image.jpg";
import OutdoorWorker from "../../../assets/images/outside-worker-image.jpg";
import HomeRepairWorker from "../../../assets/images/homerepair-worker-image.jpg";
import PainterWorker from "../../../assets/images/painter-worker-image.png";
import TrendingWorker from "../../../assets/images/trending-worker-image.jpg";
import OtherWorker from "../../../assets/images/other-worker-image.jpg";
import ServiceNavigationTabPanel from "./ServiceNavigationTabPanel";
import ServiceNavigationIcon from "./ServiceNavigationIcon";
import ServiceNavigationIcons from "../../../data/home/ServiceNavigationIcons.json";
import SeviceNavigationTabs from "../../../data/home/ServiceNavigationTabs.json";

export default function ServiceNavigation() {
  const serviceNavigationTabs = SeviceNavigationTabs.map(
    (serviceNavTabs, index) => {
      const images = [
        AssemblyWorker,
        MountingWorker,
        MovingWorker,
        CleaningWorker,
        OutdoorWorker,
        HomeRepairWorker,
        PainterWorker,
        TrendingWorker,
        OtherWorker,
      ];

      return {
        ...serviceNavTabs,
        image: images[index], // Assign the correct image from your imported list
      };
    }
  );
  return (
    <div className="service-navigation">
      <Tabs position="relative" variant="unstyled">
        <div className="service-navigation-tablist">
          <TabList>
            {ServiceNavigationIcons.map((serviceNavIcon, index) => {
              return (
                <ServiceNavigationIcon
                  key={index}
                  icon={serviceNavIcon.icon}
                  name={serviceNavIcon.name}
                />
              );
            })}
          </TabList>
        </div>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          {serviceNavigationTabs.map((serviceNavTab, index) => (
            <TabPanel>
              <ServiceNavigationTabPanel
                title={serviceNavTab.title}
                image={serviceNavTab.image}
                messageItem_1={serviceNavTab.messageItem_1}
                messageItem_2={serviceNavTab.messageItem_2}
                backgroundColor={serviceNavTab.backgroundColor}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}
