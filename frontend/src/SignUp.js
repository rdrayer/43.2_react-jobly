import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({ signup }) {
  const navigate = useNavigate();

  let initialFormData = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData); // Pass the formData to the signup function
      sessionStorage.setItem('welcomeMessage', `Welcome, ${formData.firstName}!`); // store welcome message
      navigate('/'); // redirect to homepage
    } catch (error) {
      // todo
    }
    //setFormData(initialFormData); // reset form data, not sure if this is needed anymore since we're redirecting
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other input fields as necessary */}
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
