import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import Camera from "./ScanPage";
import UserTypeSelection from "./RolePage";
import MapPage from "./MapPage";
import SuccessPage from "./SuccessPage";
import PaymentPage from "./PaymentPage";
import Userdetails from "./Userdetails";
import DriverDetails from "./driverdetails";
import RiderDashboard from "./RiderDashboard";
import RiderP from "./RiderP"
import RideafterP from "./RiderAfterP";
import RiderD from "./RiderD"
import RideafterD from "./RiderAfterD";
import Feedback from "./Feedback";

const App = () => {
  
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
        <Route path="/Mappage" element={<MapPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/Userdetails" element={<Userdetails />} />
        <Route path="/Driverdetails" element={<DriverDetails/>} />
        <Route path="/rider-dashboard" element={<RiderDashboard/>}/>
        <Route path="/riderP" element={<RiderP/>}/>
        <Route path="/RiderafterP" element={<RideafterP/>}/>
        <Route path="/riderD" element={<RiderD/>}/>
        <Route path="/RiderafterD" element={<RideafterD/>}/>
        <Route path="/Feedback" element={<Feedback/>}/>

      </Routes>
    </Router>
  );
};

export default App;
