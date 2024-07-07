import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";

export default function Home() {
  const toast = useToast();
  const auth = Auth();
  // Method to test the logout function
  const handleLogout = async () => {
    await auth.logoutUser();
    toast({
      title: `SuccessFully Logged out`,
      position: "top",
      status: "success",
      isClosable: true,
    });
  };
  return (
    <div>
      <Button onClick={() => handleLogout()} colorScheme="teal" size="xs">
        Logout
      </Button>
    </div>
  );
}
