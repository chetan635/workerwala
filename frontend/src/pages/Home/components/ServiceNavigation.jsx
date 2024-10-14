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
import { Icon } from "@iconify/react/dist/iconify.js";
import MovingWorker from "../../../assets/images/moving-worker-image.jpeg";
import MountingWorker from "../../../assets/images/mounting-worker-image.jpg";
import AssemblyWorker from "../../../assets/images/assembly-worker-image.jpg";
import CleaningWorker from "../../../assets/images/cleaning-worker-image.jpg";
import OutdoorWorker from "../../../assets/images/outside-worker-image.jpg";
import HomeRepairWorker from "../../../assets/images/homerepair-worker-image.jpg";
import PainterWorker from "../../../assets/images/painter-worker-image.png";
import TrendingWorker from "../../../assets/images/trending-worker-image.jpg";
import OtherWorker from "../../../assets/images/other-worker-image.jpg"
import ServiceNavigationTabPanel from "./ServiceNavigationTabPanel";

export default function ServiceNavigation() {
  return (
    <div className="service-navigation">
      <Tabs position="relative" variant="unstyled">
        <div className="service-navigation-tablist">
          <TabList>
            <Tab className="service-navigation-tab">
              {" "}
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="material-symbols:settings-account-box-outline"
                />
              </div>{" "}
              Assembly
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="material-symbols:tools-power-drill-sharp"
                />
              </div>
              Mounting
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="mdi:human-hand-truck"
                />
              </div>{" "}
              Moving
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                {" "}
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="game-icons:broom"
                />{" "}
              </div>{" "}
              Cleaning
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="entypo:tree"
                />
              </div>{" "}
              Outdoor Help
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="game-icons:claw-hammer"
                />
              </div>{" "}
              Home Repairs
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="game-icons:paint-roller"
                />
              </div>{" "}
              Painting
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="mdi:fire"
                />
              </div>{" "}
              Trending
            </Tab>
            <Tab className="service-navigation-tab">
              <div className="service-navigation-tab-icon">
                <Icon
                  className="service-navigation-icon"
                  height="2rem"
                  icon="basil:other-1-outline"
                />
              </div>{" "}
              Other
            </Tab>
          </TabList>
        </div>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <ServiceNavigationTabPanel
              title="Assembly"
              image={AssemblyWorker}
              messageItem_1="Assemble or disassemble furniture items by unboxing, building, and any cleanup."
              messageItem_2="Now Trending: Curved sofas, computer desks, and sustainable materials."
              backgroundColor="#f4dec9"
            />
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Mounting"
                image={MountingWorker}
                messageItem_1="Securely mount your TV, shelves, art, mirrors, dressers, and more."
                messageItem_2="Now Trending: Gallery walls, art TVs, and wraparound bookcases."
                backgroundColor="#abbfca"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Moving"
                image={MovingWorker}
                messageItem_1="Moving help such as packing/unpacking, loading, and lifting heavy items."
                messageItem_2="Now Trending: Single-item moves, apartment moves, and junk removal."
                backgroundColor="#cbe2f1"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Cleaning"
                image={CleaningWorker}
                messageItem_1="Clean your home or office; deep clean appliances and other spaces."
                messageItem_2="Now Trending: Eco-friendly products, home cleaning checklists, and cleaning hacks."
                backgroundColor="#f7edbb"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Outdoor Help"
                image={OutdoorWorker}
                messageItem_1="Outdoor help like gardening, weeding, gutter cleaning, and mowing the lawn."
                messageItem_2="Now Trending: Native plants, enhanced walkways, and outdoor lighting installation."
                backgroundColor="#e3fec1"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Home Repairs"
                image={HomeRepairWorker}
                messageItem_1="Home improvements like plumbing, electrical, and appliance installation."
                messageItem_2="Now Trending: Chandeliers, brass faucets, and smart toilets."
                backgroundColor="#ede2d1"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Painting"
                image={PainterWorker}
                messageItem_1="Paint walls, ceilings, molding, and doors; includes prep and cleanup."
                messageItem_2="Now Trending: Color blocking, stripe details, and statement colors."
                backgroundColor="#ff9090"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Trending"
                image={TrendingWorker}
                messageItem_1="Discover the hottest tasks that will level up your space."
                messageItem_2="Explore these trending tasks and book a skilled Tasker to enjoy the convenience and peace of mind that comes with it all!"
                backgroundColor="#98abba"
              />
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <ServiceNavigationTabPanel
                title="Other"
                image={OtherWorker}
                messageItem_1="Discover Other verity of tasks for your daily needs."
                messageItem_2="Explore these trending tasks and book a skilled Tasker to enjoy the convenience and peace of mind that comes with it all!"
                backgroundColor="#ffe3e5"
              />
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
