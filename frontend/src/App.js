import React , { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import JoblyApi from "./api";
import Home from "./Home";
import NavBar from "./NavBar";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
//import Login from
//import Profile from

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobsList />} />
            {/*
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            */}
            <Route element={<p>Hmm, I can't seem to find the page you're looking for.</p>} />
          </Routes>     
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
