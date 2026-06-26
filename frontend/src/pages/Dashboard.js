import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/");

  };

  return (

    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.topBar}>

        <img
          src="/nic-logo.png"
          alt="NIC Logo"
          style={styles.logo}
        />

        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* TITLE */}

      <h1 style={styles.heading}>
        User Login Pattern Analysis Dashboard
      </h1>

      <p style={styles.subHeading}>
        Authentication Monitoring & Security Analytics
      </p>

      {/* MODULES */}

      <div style={styles.cardContainer}>

        {/* MODULE 1 */}

        <div style={styles.card}>

          <h2>User Activity & Login Statistics</h2>

          <div style={styles.line}></div>

          <ul style={styles.list}>
            <li>Active Users</li>
            <li>Failed Login Statistics</li>
            <li>User Activity Reports</li>
          </ul>

        </div>

        {/* MODULE 2 */}

        <div style={styles.card}>

          <h2>Risk Analytics</h2>

          <div style={styles.line}></div>

          <ul style={styles.list}>
            <li>Risk Score Analytics</li>
            <li>Threat Level Monitoring</li>
            <li>Suspicious Login Detection</li>
          </ul>

        </div>

        {/* MODULE 3 */}

        <div style={styles.card}>

          <h2>Security Intelligence</h2>

          <div style={styles.line}></div>

          <ul style={styles.list}>
            <li>AI Generated Summaries</li>
            <li>Alert Notifications</li>
            <li>Device Analysis</li>
            <li>Geographic Analysis</li>
          </ul>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {

    minHeight: "100vh",

    background: "#eef5ff",

    padding: "30px"

  },

  topBar: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "20px"

  },

  logo: {

    width: "180px",

    objectFit: "contain"

  },

  logoutBtn: {

    padding: "10px 20px",

    background: "#003f8a",

    color: "white",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "bold"

  },

  heading: {

    textAlign: "center",

    color: "#003f8a",

    marginBottom: "10px",

    fontSize: "40px"

  },

  subHeading: {

    textAlign: "center",

    color: "#666",

    marginBottom: "50px",

    fontSize: "18px"

  },

  cardContainer: {

    display: "flex",

    justifyContent: "center",

    gap: "30px",

    flexWrap: "wrap"

  },

  card: {

    width: "340px",

    minHeight: "250px",

    background: "white",

    borderRadius: "15px",

    padding: "25px",

    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"

  },

  line: {

    height: "2px",

    background: "#d9d9d9",

    margin: "15px 0"

  },

  list: {

    paddingLeft: "20px",

    lineHeight: "2",

    color: "#444",

    fontSize: "16px"

  }

};

export default Dashboard;