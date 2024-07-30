import React, { useEffect, useState } from "react";
import MultiStepFormNavigation from "./MultiStepFormNavigation";
import {
  CheckboxGroup,
  Checkbox,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  InputGroup,
  InputRightAddon,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import "../../../css/Authentication/workerwala-form-steps/ProfessionalInformation.css";
import { AddIcon } from "@chakra-ui/icons";

export default function ProfessionalInformation({
  step,
  workerWalaInfo,
  setWorkerWalaInfo,
  handlePrevClick,
  handleNextOrSubmit,
}) {
  /**
   * Form data variables
   */
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skillsAndSpecializations, setSkillsAndSpecializations] = useState("");
  const [certification, setCertification] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [availability, setAvailability] = useState([]);

  /**
   * Visible component variables
   */
  const [jobTitleError, setJobTitleError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [skillsAndSpecializationsError, setSkillsAndSpecializationsError] =
    useState(false);
  const [certificationError, setCertificationError] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const toast = useToast();

  /**
   * Method to handle the error toast
   * @param {*} title
   * @param {*} setupFunction
   * @returns
   */
  const throwInvalidFormatError = (title, setupFunction) => {
    setupFunction(true);
    return toast({
      title: title,
      status: "error",
      position: "top",
      isClosable: true,
      onCloseComplete: () => setupFunction(false),
    });
  };

  /**
   * Handle add certificaqtion
   */
  const handleAddCertification = () => {
    if (certification == "") {
      return throwInvalidFormatError(
        "Please add valid certifications and licences",
        setCertificationError
      );
    }
    setCertifications([...certifications, certification]);
    setCertification("");
  };

  // Validate Years
  function validateExperience(experience) {
    const regex = /^[0-9]+$/;
    return regex.test(experience);
  }

  /**
   * Handle tab close
   */
  const handleCloseTag = (index) => {
    certifications.splice(index, 1);
    setCertifications([...certifications]);
  };

  // Handle the navigation and next / submit
  const handlePrev = () => {
    handlePrevClick();
  };

  const handleNext = () => {
    if (jobTitle == "") {
      return throwInvalidFormatError(
        "Please select valid job title",
        setJobTitleError
      );
    }
    if (experience == "" || !validateExperience(experience)) {
      return throwInvalidFormatError(
        "Please add valid experirnce in years",
        setExperienceError
      );
    }
    if (availability.length == 0) {
      return throwInvalidFormatError(
        "Please select availability for work for your employer",
        setAvailabilityError
      );
    }
    if (certifications.length == 0) {
      return throwInvalidFormatError(
        "Please add atleast one certificate and licence",
        setCertificationError
      );
    }
    if (skillsAndSpecializations == "") {
      return throwInvalidFormatError(
        "Please add skills and specilization in your field",
        setSkillsAndSpecializationsError
      );
    }
    // Add details to form data
    setWorkerWalaInfo({
      ...workerWalaInfo,
      jobTitle: jobTitle,
      experience: experience,
      availability: availability,
      certifications: certifications,
      skillsAndSpecializations: skillsAndSpecializations,
    });

    // Navigate to next page
    handleNextOrSubmit();
  };

  return (
    <div className="professional_information_body multistep_form_step_body">
      <Heading size="lg">Professional details</Heading>
      <div className="professional_information_container multistep_form_step_container">
        <div className="job_title form-item">
          <FormLabel for="job-title">Select Job Title</FormLabel>
          <Select
            isInvalid={jobTitleError}
            variant="filled"
            errorBorderColor="crimson"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Select option"
            id="job-title"
            name="job-title"
          >
            <option value="construction-laborer">Construction Laborer</option>
            <option value="agricultural-worker">Agricultural Worker</option>
            <option value="factory-worker">Factory Worker</option>
            <option value="domestic-worker">Domestic Worker</option>
            <option value="rickshaw-puller">Rickshaw Puller</option>
            <option value="mason">Mason</option>
            <option value="carpenter">Carpenter</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
            <option value="welder">Welder</option>
            <option value="painter">Painter</option>
            <option value="security-guard">Security Guard</option>
            <option value="textile-worker">Textile Worker</option>
            <option value="mining-laborer">Mining Laborer</option>
            <option value="road-construction-worker">
              Road Construction Worker
            </option>
            <option value="sewage-worker">Sewage Worker</option>
            <option value="stone-cutter">Stone Cutter</option>
            <option value="porter">Porter</option>
            <option value="sanitation-worker">Sanitation Worker</option>
            <option value="construction-helper">Construction Helper</option>
            <option value="construction-helper">Other</option>
          </Select>
        </div>
        <div className="experience form-item">
          <FormLabel>Experience (In Years)</FormLabel>
          <Input
            isInvalid={experienceError}
            onChange={(e) => setExperience(e.target.value)}
            variant="filled"
            value={experience}
            placeholder="Experience"
            size="md"
            type="number"
          />
        </div>
        <div className="availability">
          <FormLabel>Select Availability</FormLabel>
          <CheckboxGroup
            isInvalid={availabilityError}
            value={availability}
            onChange={setAvailability}
          >
            <div className="checkboxes">
              <Checkbox value="monday">Monday</Checkbox>
              <Checkbox value="tuesday">Tuesday</Checkbox>
              <Checkbox value="wednesday">Wednesday</Checkbox>
              <Checkbox value="thursday">Thursday</Checkbox>
              <Checkbox value="friday">Friday</Checkbox>
              <Checkbox value="saturday">Saturday</Checkbox>
              <Checkbox value="sunday">Sunday</Checkbox>
              <Checkbox value="full-time">Full-Time</Checkbox>
              <Checkbox value="part-time">Part-Time</Checkbox>
              <Checkbox value="day-shift">Day Shift</Checkbox>
              <Checkbox value="night-shift">Night Shift</Checkbox>
            </div>
          </CheckboxGroup>
        </div>
        <div className="certification">
          <FormLabel>Certifications and Licenses</FormLabel>
          <InputGroup>
            <Input
              isInvalid={certificationError}
              errorBorderColor="crimson"
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              type="text"
              variant="filled"
              id="certification"
              placeholder="Add Certifications"
            />
            <InputRightAddon>
              <Button onClick={() => handleAddCertification()}>
                <AddIcon />
              </Button>
            </InputRightAddon>
          </InputGroup>
          <div className="certification_items">
            {certifications.map((cer, index) => (
              <Tag
                size="md"
                key={index}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{cer}</TagLabel>
                <TagCloseButton
                  id={index}
                  onClick={() => handleCloseTag(index)}
                />
              </Tag>
            ))}
          </div>
        </div>
        <div className="skillsAndSpecializations form-item">
          <FormLabel>Skills and Specializations</FormLabel>
          <Textarea
            isInvalid={skillsAndSpecializationsError}
            errorBorderColor="crimson"
            value={skillsAndSpecializations}
            onChange={(e) => setSkillsAndSpecializations(e.target.value)}
            variant="filled"
            resize="none"
            size="md"
            id="skillsAndSpecializations"
            placeholder="Please breef about your skills and spelizations"
          />
        </div>
      </div>
      <MultiStepFormNavigation
        step={step}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}
