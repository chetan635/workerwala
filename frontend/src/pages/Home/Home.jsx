import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Auth } from "../../lib/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../../css/home/home.css";
import IntroductionSection from "./components/IntroductionSection";
import ServiceNavigation from "./components/ServiceNavigation";
import { useState } from "react";
import Loading from "../../components/common/Loading";
import BusinessHeading from "./components/BusinessHeadings";
import BusinessFeatures from "./components/BusinessFeatures";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const toast = useToast();
  const auth = Auth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle any errors

  const handleLogout = async () => {
    await auth.logoutUser();
    toast({
      title: `SuccessFully Logged out`,
      position: "top",
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    // Function to fetch current user details
    const fetchUserDetails = async () => {
      try {
        const res = await auth.getCurrentUser(); // Get current user from API call
        setUserDetails(res);
        auth.setUser(userDetails) // Set user details in state
      } catch (err) {
        setError(err.message || "Failed to load user details.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails(); // Call the function on component mount
  }, []); // Add auth as a dependency in case it changes

  // Render different states: loading, error, or user details
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
    
  return (
    <div>
      {/* <Button onClick={() => handleLogout()} colorScheme="teal" size="xs">
        Logout
      </Button> */}
      <header className="header-class flex-c-c">
        <Navbar />
      </header>
      <main className="main-content">
        <IntroductionSection />
        <ServiceNavigation />
        <BusinessHeading />
        <Testimonials />
        <BusinessFeatures />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
