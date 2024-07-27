import { Button } from "@chakra-ui/react";
import React from "react";

export default function MultiStepFormNavigation({
  step,
  handlePrev,
  handleNext,
}) {
  return (
    <div className="flex-sb-c navigation">
      <Button
        onClick={() => handlePrev()}
        width="100px"
        colorScheme={step == 0 ? "gray" : "red"}
        size="sm"
        isDisabled={step == 0 ? true : false}
      >
        Prev
      </Button>
      <Button
        onClick={() => handleNext()}
        width="100px"
        colorScheme="green"
        size="sm"
      >
        {step == 4 ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
