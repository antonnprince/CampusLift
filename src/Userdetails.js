import React, { useState } from "react";
import "./Userdetails.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Userdetails = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    // phoneno:123456789,
    name: "",
    email: "",
    DOB: "",
    department: "",
    role:"P",
    // cusatID:"aws",
    // driverLicense:"asd"
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
    // const apiUrl = "http://localhost:3000/register";
    console.log(formData)
    try {
      const res = await axios.post("http://localhost:3000/register",formData)
      console.log(res)  
      
      if(res.status===200)
        navigate("/Mappage")
    } catch (error) {
      console.log(error)
    }
    
    // console.error("Error:", error);
     
  };

  return (
    <div className="driver-license-form">
      <h2>Fill Your Details</h2>
      <p>Please ensure that the entered details are correct.</p>
      <form onSubmit={handleSubmit}>
        <h2>Enter your Name</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <h2>Enter your Email</h2>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <h2>Enter your Date of birth</h2>
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
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
