import React, { useState, useCallback } from "react";
import { storage } from "./firebase.config"; // Import storage from firebase.config
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import "./ScanPage.css"; // Import the CSS file

const Camera = ({ user }) => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]); // Store the selected file in state
  };

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }

    setUploading(true);
    try {
      const { type, name } = file; // Get file type and name

      const storageRef = storage.ref().child(`uploads/${user.uid}/${name}`); // Access storage and upload file
      await storageRef.put(file);

      const downloadURL = await storageRef.getDownloadURL();
      console.log("File uploaded successfully:", downloadURL);

      setUploading(false);
      toast.success("ID Card uploaded successfully!");

      navigate("/RolePage");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      toast.error("Error uploading file. Please try again!");
    }
  };

  return (
    <div className="camera-container">
      <p className="text">Upload your college ID Card</p>
      <div className="camera-card">
        <input
          className="input"
          type="file"
          onChange={handleFileUpload}
          accept="image/*,application/pdf"
          aria-label="Upload your college ID Card"
        />
        <div className="button-group">
          <button onClick={uploadFile} className="button" disabled={uploading}>
            {uploading ? (
              <span>
                <CgSpinner className="animate-spin inline-block mr-1" />
                Uploading...
              </span>
            ) : (
              <span>Upload</span>
            )}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Camera;
