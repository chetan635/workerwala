import { Button } from "@chakra-ui/react";
import React from "react";

export default function MultiStepFormNavigation({
  isLoading,
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
        isLoading={isLoading}
        onClick={() => handleNext()}
        width="100px"
        colorScheme="green"
        size="sm"
      >
        {step == 5 ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
