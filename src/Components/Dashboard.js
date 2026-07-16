import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "#f4f7fc",
    },

    contentArea: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },

    topBar: {
      height: "70px",
      background: "#ffffff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      position: "sticky",
      top: 0,
      zIndex: 10,
    },

    pageTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#1f2937",
    },

    profileSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },

    profileImage: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#6366f1",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "16px",
    },

    content: {
      padding: "25px",
      flex: 1,
    },

    card: {
      background: "#fff",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      minHeight: "calc(100vh - 120px)",
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.contentArea}>
        {/* Top Header */}
        <div style={styles.topBar}>
          <h2 style={styles.pageTitle}>Dashboard</h2>

          <div style={styles.profileSection}>
            <div>
              <div style={{ fontWeight: "600" }}>Sincere</div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Software Developer
              </div>
            </div>

            <div style={styles.profileImage}>S</div>
          </div>
        </div>

        {/* Page Content */}
        <div style={styles.content}>
          <div style={styles.card}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;