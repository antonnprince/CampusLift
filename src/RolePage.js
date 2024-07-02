import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RolePage.css";

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const handleSelection = (type) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    const registrationPage = {
      rider: "/rider-registration",
      passenger: "/passenger-registration",
    };

    if (registrationPage.hasOwnProperty(selectedType)) {
      navigate(registrationPage[selectedType]);
    } else {
      alert("Please select a user type.");
    }
  };

  return (
    <div className="user-type-selection">
      <h3>Select Your Role</h3>
      <div className="image-selection">
        <img
          src="/Images/driver.jpg" // Replace with path to rider image
          alt="Rider"
          className={`user-type-image ${
            selectedType === "rider" ? "selected" : ""
          }`}
          onClick={() => handleSelection("rider")}
        />
        <img
          src="/Images/passenger.jpg" // Replace with path to passenger image
          alt="Passenger"
          className={`user-type-image ${
            selectedType === "passenger" ? "selected" : ""
          }`}
          onClick={() => handleSelection("passenger")}
        />
      </div>
      <button
        className="button"
        onClick={handleSubmit}
        disabled={!selectedType}
      >
        Submit
      </button>
    </div>
  );
};

export default UserTypeSelection;
