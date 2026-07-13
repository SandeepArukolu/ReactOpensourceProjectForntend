import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from './Loader/Loader';

function Login({setAuth}) {
  // State to hold form data
  const [Username, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    debugger
    setLoading(true);
    e.preventDefault();

    // Basic validation (just an example)
    if (Username !="" || Password != "") {
        const API_BASE_URL = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.post(`${API_BASE_URL}/api/Test/login`, {Username,Password}, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        debugger
        setLoading(false);
        localStorage.setItem('token',  response.data.token);
        console.log(response);
        setAuth(true);
        navigate("/dashboard");
    }
    catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
      }
    // Reset the form
    setEmail('');
    setPassword('');
    setError('');
  };
};
const styles = {
    pageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    },
    formContainer: {
      width: '400px',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputContainer: {
      marginBottom: '20px',
    },
    label: {
      marginBottom: '5px',
      fontSize: '16px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    button: {
      padding: '12px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginBottom: '15px',
      textAlign: 'center',
    },
  };

return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={Username}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
      {loading ? <Loader /> : <div></div>}
    </div>
  );


}

export default Login

