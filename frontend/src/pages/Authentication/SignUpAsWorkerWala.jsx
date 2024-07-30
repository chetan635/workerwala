import React, { useEffect, useState } from "react";
import "../../css/Authentication/SignUpAsWorkerWala.css";
import {
  Box,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PersonalInformation from "./workerwala-form-steps/PersonalInformation";
import ProfessionalInformation from "./workerwala-form-steps/ProfessionalInformation";
import BackgroundInformation from "./workerwala-form-steps/BackgroundInformation";

export default function SignUpAsWorkerWala() {
  const [tabIndex, setTabIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [workerWalaInfo, setWorkerWalaInfo] = useState({});

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  /**
   * Method to handle the next or submit click
   */
  const handleNextOrSubmit = () => {
    if (step != 4) {
      setStep(step + 1);
      setTabIndex(tabIndex + 1);
    }
  };

  /**
   * Method to handle "prev" click
   */
  const handlePrevClick = () => {
    if (step != 0) {
      setStep(step - 1);
      setTabIndex(tabIndex - 1);
    }
  };

  return (
    <div className="sign_up_as_workerwala_body">
      <div className="sign_up_as_workerwala_container">
        <Box className="multiform_box">
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab
                isDisabled={step == 0 ? false : true}
                className={tabIndex == 0 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="ic:baseline-person"
                  height="30px"
                />
              </Tab>
              <Tab
                isDisabled={step == 1 ? false : true}
                className={tabIndex == 1 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="bi:person-vcard-fill"
                  height="30px"
                />
              </Tab>
              <Tab
                isDisabled={step == 2 ? false : true}
                className={tabIndex == 2 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="mdi:book-education"
                  height="30px"
                />
              </Tab>
              <Tab
                isDisabled={step == 3 ? false : true}
                className={tabIndex == 3 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="healthicons:i-documents-accepted"
                  height="30px"
                />
              </Tab>
              <Tab
                isDisabled={step == 4 ? false : true}
                className={tabIndex == 4 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="basil:other-1-solid"
                  height="30px"
                />
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PersonalInformation
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
              <TabPanel>
                <ProfessionalInformation
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
              <TabPanel>
                <BackgroundInformation
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
              <TabPanel>
                <p>Oh, hello there this is panel 4.</p>
              </TabPanel>
              <TabPanel>
                <p>Oh, hello there this is panel 5.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </div>
  );
}
