import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './App';

function NavBar() {
  const { currentUser, logout } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav>
      <Link to="/">Jobly</Link>
      {currentUser && (
        <>
          {" | "}
          <Link to="/companies">Companies</Link>
          {" | "}
          <Link to="/jobs">Jobs</Link>
          {" | "}
          <Link to={`/users/${currentUser.username}`}>Profile</Link>
        </>
      )}
      {currentUser ? (
        <>
          {" | "}
          <a href="/logout" onClick={handleLogout}>
            Logout {currentUser.firstName || currentUser.username}
          </a>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
