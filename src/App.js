import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './MapPage';
import SuccessPage from './SuccessPage';
import PaymentPage from './PaymentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/payment" element={<PaymentPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
