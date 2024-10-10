import React, { useEffect, useState } from "react";
import "../../css/Authentication/UserTypeChoice.css";
import { Button, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import WorkerWalaLogo from "../../components/common/WorkerWalaLogo";

export default function UserTypeChoice() {
  // Setting up the state variables:
  const [value, setValue] = useState("User");
  const navigate = useNavigate();

  // Handle the selected choice:
  const handleChoiceSelection = () => {
    if (value == "User") {
      navigate("/signUp");
    } else {
      navigate("/sign-up-as-workerwala");
    }
  };

  return (
    <div className="user_type_choice_body">
      <div className="user_type_choice_container">
        <WorkerWalaLogo />
        <Heading size="md">Please select role</Heading>
        <Divider />
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            <div
              className={
                value == "User"
                  ? "choose-card selected flex-c-c flex-dir-c user"
                  : "choose-card flex-c-c flex-dir-c user"
              }
            >
              <Icon
                icon="mage:user-fill"
                height="60px"
                style={{ color: "#ffc83d" }}
              />
              <Radio size="md" colorScheme="green" value="User">
                <small>
                  <b>Join as User</b>
                </small>
              </Radio>
            </div>
            <div
              className={
                value == "WorkerWala"
                  ? "choose-card selected flex-c-c flex-dir-c worker"
                  : "choose-card flex-c-c flex-dir-c worker"
              }
            >
              <Icon
                icon="mdi:worker"
                height="60px"
                style={{ color: "#ffc83d" }}
              />
              <Radio size="md" colorScheme="green" value="WorkerWala">
                <small>
                  <b>Become WorkerWala</b>
                </small>
              </Radio>
            </div>
          </Stack>
        </RadioGroup>
        <Divider />
        <Button
          colorScheme="teal"
          h="2.25rem"
          width="85%"
          size="sm"
          onClick={() => handleChoiceSelection()}
        >
          {"Join as " + value}
        </Button>
      </div>
    </div>
  );
}
