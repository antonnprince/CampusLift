import React, { useState } from "react";
import "./Userdetails.css";

const Userdetails = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    dob: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API URL
    const apiUrl = "https://your-backend-api.com/store-driver-license";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="driver-license-form">
      <h2>Fill Your Details</h2>
      <p>Please ensure that the entered details are correct.</p>
      <form onSubmit={handleSubmit}>
        <h2>Enter your Name</h2>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <h2>Enter your Email</h2>
        <input
          type="text"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <h2>Enter your Date of birth</h2>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <h2>Enter your Department</h2>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Userdetails;
