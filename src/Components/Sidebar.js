import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const styles = {
    sidebar: {
      width: "280px",
      height: "100vh",
      background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
    },

    logoContainer: {
      padding: "25px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      textAlign: "center",
    },

    logo: {
      fontSize: "28px",
      marginBottom: "10px",
    },

    companyName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#fff",
    },

    menuContainer: {
      flex: 1,
      padding: "20px 15px",
    },

    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 18px",
      marginBottom: "10px",
      textDecoration: "none",
      color: "#cbd5e1",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      fontSize: "15px",
      fontWeight: "500",
    },

    logoutContainer: {
      padding: "20px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },

    logoutBtn: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "12px",
      background: "#ef4444",
      color: "#fff",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
    },

    profile: {
      padding: "20px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    avatar: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      background: "#6366f1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "18px",
    },
  };

  const activeStyle = {
    background: "#4f46e5",
    color: "#fff",
    boxShadow: "0 4px 15px rgba(79,70,229,0.4)",
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logoContainer}>
        <div style={styles.logo}>🚀</div>
        <div style={styles.companyName}>Admin Portal</div>
      </div>

      <div style={styles.menuContainer}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? activeStyle : {}),
          })}
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? activeStyle : {}),
          })}
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? activeStyle : {}),
          })}
        >
          ⚙️ Settings
        </NavLink>

        <NavLink
          to="/components/invoice"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? activeStyle : {}),
          })}
        >
          📄 Download Invoice
        </NavLink>

        <NavLink
          to="/components/product/productList"
          style={({ isActive }) => ({
            ...styles.menuItem,
            ...(isActive ? activeStyle : {}),
          })}
        >
          📦 Items
        </NavLink>
      </div>

      <div style={styles.profile}>
        <div style={styles.avatar}>S</div>
        <div>
          <div style={{ fontWeight: "600" }}>Sincere</div>
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            Software Developer
          </div>
        </div>
      </div>

      <div style={styles.logoutContainer}>
        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;