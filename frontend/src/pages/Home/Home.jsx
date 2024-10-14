import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";
import Navbar from "./components/Navbar";
import "../../css/home/home.css";
import IntroductionSection from "./components/IntroductionSection";
import ServiceNavigation from "./components/ServiceNavigation";

export default function Home() {
  const toast = useToast();
  const auth = Auth();
  // Method to test the logout function
  // const handleLogout = async () => {
  //   await auth.logoutUser();
  //   toast({
  //     title: `SuccessFully Logged out`,
  //     position: "top",
  //     status: "success",
  //     isClosable: true,
  //   });
  // };
  return (
    <div>
      {/* <Button onClick={() => handleLogout()} colorScheme="teal" size="xs">
        Logout
      </Button> */}
      <header className = "header-class flex-c-c" >
        <Navbar />
      </header>
      <main className="main-content">
        <IntroductionSection/>
        <ServiceNavigation/>
      </main>
    </div>
  );
}
