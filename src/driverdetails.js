import React, { useState } from "react";
import "./driverdetails.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const DriverDetails = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    phoneno:487348, 
    role:"D",
    email: "",
    DOB: "",
    department: "",
    // licenseNumber: "",
  });

  const [licenseFile, setLicenseFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://your-backend-api.com/store-driver-license";

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (licenseFile) {
      formDataToSend.append("licenseFile", licenseFile);
    }

    try{
      console.log(formData)
      // const res = await axios.post("http://localhost:3000/register",formData)
      // console.log(res)
      
      // if(res.status===200)
        navigate("/rider-dashboard")
    } catch (error) 
    {
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
          name="name"
          value={formData.Name}
          onChange={handleChange}
        />
        <h2>Enter your Email</h2>
        <input
          type="email"
          name="email"
          value={formData.Email}
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
        <h2>Enter your License Number</h2>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
        />
        <h2>Upload your License (PDF/Image)</h2>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <button type="submit" className="submit-button">
          Continue
        </button>
      </form>
    </div>
  );
};

export default DriverDetails;
