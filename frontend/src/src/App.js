import React from "react";
import { BrowserRouter as Router , Routes, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home/home";
import AddCostItem from "./Pages/addCostItem/addCostItem";
import Navbar from "./Pages/Navbar/navbar";
import GetReport from "./Pages/Reports/Reports";

function App() {
  return (
    <Router>
      <>
      <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/addcostitem" element={<AddCostItem/>} />
            <Route path="/getreport" element={<GetReport/>} />
          </Routes>
      </>
    </Router>
  );
}

export default App;
