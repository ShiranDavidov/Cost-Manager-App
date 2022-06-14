import React from "react";
import { BrowserRouter as Router , Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home/home";
import AddCostItem from "./Pages/addCostItem/addCostItem";
import Navbar from "./Pages/Navbar/navbar";

function App() {
  return (
    <Router>
      <>
      <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/addCostItem" element={<AddCostItem/>} />
          </Routes>
      </>
    </Router>
  );
}

export default App;
