import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

function Login({ setAuth }) {
  const [Username, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Username !== "" && Password !== "") {
      const API_BASE_URL = process.env.REACT_APP_API_URL;

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/Test/login`,
          {
            Username,
            Password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.setItem("token", response.data.token);

        setAuth(true);
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        setError(
          error.response?.data?.message ||
            "Invalid username or password"
        );
      }
    } else {
      setLoading(false);
      setError("Please enter Username and Password");
    }
  };

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },

    backgroundCircle1: {
      position: "absolute",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)",
      top: "-100px",
      left: "-100px",
    },

    backgroundCircle2: {
      position: "absolute",
      width: "250px",
      height: "250px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.08)",
      bottom: "-80px",
      right: "-80px",
    },

    formContainer: {
      width: "100%",
      maxWidth: "420px",
      padding: "40px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      color: "#fff",
      zIndex: 2,
    },

    logo: {
      textAlign: "center",
      fontSize: "50px",
      marginBottom: "10px",
    },

    heading: {
      textAlign: "center",
      marginBottom: "8px",
      fontSize: "32px",
      fontWeight: "700",
      color: "#fff",
    },

    subHeading: {
      textAlign: "center",
      marginBottom: "30px",
      color: "rgba(255,255,255,0.8)",
      fontSize: "14px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
    },

    inputContainer: {
      marginBottom: "20px",
    },

    label: {
      display: "block",
      marginBottom: "8px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "500",
    },

    input: {
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },

    button: {
      padding: "14px",
      borderRadius: "10px",
      border: "none",
      background: "#ffffff",
      color: "#667eea",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },

    error: {
      background: "rgba(255,0,0,0.15)",
      border: "1px solid rgba(255,0,0,0.3)",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "15px",
      textAlign: "center",
      color: "#fff",
    },

    footer: {
      marginTop: "25px",
      textAlign: "center",
      color: "rgba(255,255,255,0.7)",
      fontSize: "13px",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>

      <div style={styles.formContainer}>
        <div style={styles.logo}>🔐</div>

        <h2 style={styles.heading}>Welcome Back</h2>

        <p style={styles.subHeading}>
          Sign in to continue to your dashboard
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username / Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={Username}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.background = "#f3f4f6";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#ffffff";
              e.target.style.transform = "translateY(0px)";
            }}
          >
            Login
          </button>
        </form>

        <div style={styles.footer}>
          © 2026 Your Company. All Rights Reserved.
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
}

export default Login;