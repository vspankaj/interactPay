import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Stripe from './components/Pages/Stripe';
import Plaid from './components/Pages/Plaid';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Stripe />} />
          <Route path="/Plaid" element={<Plaid />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
