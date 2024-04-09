import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './App';

function NavBar() {
  const { currentUser, logout } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/companies">Companies</Link> | 
      <Link to="/jobs">Jobs</Link> | 
      <Link to="/profile">Profile</Link> |
      {currentUser ? (
        <>
          <a href="/logout" onClick={handleLogout}>
            Logout {currentUser.username}
          </a>
        </>
      ) : (
        // if no user is logged in, show login/signup links
        <>
          <Link to="/login">Login</Link> | 
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
