import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/companies">Companies</Link> | 
      <Link to="/jobs">Jobs</Link> | 
      <Link to="/login">Login/Signup</Link> | 
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default NavBar;
