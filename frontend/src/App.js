import React , { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from './useLocalStorage'
import './App.css';
import JoblyApi from "./api";
import Home from "./Home";
import NavBar from "./NavBar";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobsList";
import JobDetail from "./JobDetail";
import { jwtDecode } from 'jwt-decode';
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";

export const UserContext = createContext();

function App() {
  const [token, setToken] = useLocalStorage('joblyToken');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUser() {
      console.log(token, typeof(token), 'token');
      if (token) {
        try {
          let { username } = jwtDecode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log("user is logged in");
        }
        catch (error) {
        setCurrentUser(null);
        console.error("user is NOT logged in", error)
        }
      }
    }
    getCurrentUser();
  }, [token]);

  async function login(loginData) {
    const token = await JoblyApi.login(loginData);
    setToken(token);
  }

  async function signup(signupData) {
    const token = await JoblyApi.signup(signupData);
    setToken(token);
  }

  async function editProfile(editData) {
    const token = await JoblyApi.editProfile(editData);
    setToken(token);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('joblyToken');
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, logout }}>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:handle" element={<CompanyDetail />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/jobs/:id" element={<JobDetail />}/>
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/signup" element={<SignUp signup={signup} />} />
              <Route path="/users/:username" element={<Profile />} />
              <Route element={<p>Hmm, I can't seem to find the page you're looking for.</p>} />
            </Routes>     
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
