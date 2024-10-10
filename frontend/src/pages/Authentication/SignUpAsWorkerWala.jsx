import React, { useEffect, useState } from "react";
import "../../css/Authentication/SignUpAsWorkerWala.css";
import {
  Box,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PersonalInformation from "./workerwala-form-steps/PersonalInformation";
import ProfessionalInformation from "./workerwala-form-steps/ProfessionalInformation";
import BackgroundInformation from "./workerwala-form-steps/BackgroundInformation";
import DocumentsVerification from "./workerwala-form-steps/DocumentsVerification";
import OtherInformation from "./workerwala-form-steps/OtherInformation";
import PasswordInformation from "./workerwala-form-steps/PasswordInformation";
import { Auth } from "../../lib/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function SignUpAsWorkerWala() {
  const [tabIndex, setTabIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [workerWalaInfo, setWorkerWalaInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = Auth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  /**
   * Method to handle the next or submit click
   */
  const handleNextOrSubmit = () => {
    if (step != 5) {
      setStep(step + 1);
      setTabIndex(tabIndex + 1);
    }
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    // API Request to the "/auth/register" route in backend to register workerwala user.
    try {
      const workerWalaInfoString = JSON.stringify({
        userName: workerWalaInfo.userName,
        password: workerWalaInfo.password,
        email: workerWalaInfo.email,
        dataOfBirth: workerWalaInfo.dataOfBirth,
        fullName : workerWalaInfo.fullName,
        phoneNumber : workerWalaInfo.phoneNumber,
        gender : workerWalaInfo.gender,
        address : workerWalaInfo.address,
        jobTitle : workerWalaInfo.jobTitle,
        experience : workerWalaInfo.experience,
        availability : workerWalaInfo.availability,
        certifications : workerWalaInfo.certifications,
        skillsAndSpecializations : workerWalaInfo.skillsAndSpecializations,
        employmentDetails : workerWalaInfo.employmentDetails,
        educationDetails : workerWalaInfo.educationDetails,
        bio : workerWalaInfo.bio,
        serviceRates : workerWalaInfo.serviceRates,
        references : workerWalaInfo.references,
        emergencyContactName : workerWalaInfo.emergencyContactName,
        emergencyContactRelationship : workerWalaInfo.emergencyContactRelationship,
        emergencyContactPhoneNumber : workerWalaInfo.emergencyContactPhoneNumber
      });
      const signUpResponse = await auth.SignUpAsWorkerwala({
        workerWalaInfoString : workerWalaInfoString, 
        governmentId : workerWalaInfo.governmentId, 
        proofOfAddress: workerWalaInfo.proofOfAddress,
        professionalLicense: workerWalaInfo.professionalLicense,
        profilePicture: workerWalaInfo.profilePicture});

      if (signUpResponse.status == "success") {
        toast({
          title: signUpResponse.message,
          status: "success",
          isClosable: true,
        });
        navigate("/verify-email", { state: workerWalaInfo.email });
      } else {
        toast({
          title: signUpResponse.message,
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: `Something went wrong while creating the accout, Please retry`,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (step == 5 && workerWalaInfo.password !== undefined) {
      handleSubmitForm(workerWalaInfo);
    }
  }, [workerWalaInfo]);

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
              <Tab
                isDisabled={step == 5 ? false : true}
                className={tabIndex == 5 ? "tab selected-tab" : "tab"}
              >
                <Icon
                  className="iconify_icon"
                  icon="simple-icons:authelia"
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
                <DocumentsVerification
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
              <TabPanel>
                <OtherInformation
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
              <TabPanel>
                <PasswordInformation
                  isLoading={isLoading}
                  step={step}
                  workerWalaInfo={workerWalaInfo}
                  setWorkerWalaInfo={setWorkerWalaInfo}
                  handleNextOrSubmit={handleNextOrSubmit}
                  handlePrevClick={handlePrevClick}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </div>
  );
}
