import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import Camera from "./ScanPage";
import UserTypeSelection from "./RolePage";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './MapPage';
import SuccessPage from './SuccessPage';
import PaymentPage from './PaymentPage';

const App = () => {
  useEffect(() => {
    // Check for user session or token here
    // For example:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   setUser({ id: 1, name: 'User' }); // Replace with actual user data
    // }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={
            <div className="#ffff flex items-center justify-center h-screen">
              <SignIn />
            </div>
          }
        />
        <Route path="/ScanPage" element={<Camera />} />
        <Route path="/RolePage" element={<UserTypeSelection />} />
        <Route path="/" element={<MapPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/payment" element={<PaymentPage/>}/>
      </Routes>
    </Router>
  );
}
