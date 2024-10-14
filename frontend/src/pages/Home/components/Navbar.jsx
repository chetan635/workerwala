import React, { useState } from "react";
import "../../../css/home/components/navbar.css";
import WorkerWalaLogo from "../../../components/common/WorkerWalaLogoV2";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle
  const navigate = useNavigate();

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-container flex-se-c">
      <div className="logo">
        <WorkerWalaLogo />
      </div>

      {/* Hamburger icon for small screens */}
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <Icon icon="mingcute:close-fill" size={30} /> : <Icon icon="lucide:menu" size={30} />}
      </div>

      <div className={`navbar-elements ${isOpen ? "active" : ""}`}>
        <div className="element">Services</div>
        <div onClick={() => navigate("/login")} className="element">
          Sign up/Log in
        </div>
        <div className="element">
          <Button
            onClick={() => navigate("/sign-up-as-workerwala")}
            colorScheme="teal"
            variant="outline"
          >
            Become WorkerWala
          </Button>
        </div>
      </div>
    </div>
  );
}