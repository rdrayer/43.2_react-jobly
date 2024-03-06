import React , { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import JoblyApi from "./api";
import Home from "./Home";
import NavBar from "./NavBar";
//import CompaniesList from
//import CompanyDetails from
//import JobsList from
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
            {/*
            <Route path="/companies">
              <CompaniesList />
            </Route>
            <Route path="/companies/:companyId">
              <CompanyDetails />
            </Route>
            <Route path="/jobs">
              <JobsList />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            */}
            <Route element={<p>Hmm, I can't seem to find the page you're looking for.</p>} />
          </Routes>     
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
