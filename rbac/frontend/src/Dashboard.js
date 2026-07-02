import React from "react";
import Sidebar from "./Sidebar";

function Dashboard({ menus }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar menus={menus} />

      <div
        style={{
          padding: "30px",
          flex: 1
        }}
      >
        <h1>Dashboard</h1>

        <p>Welcome to User Login Pattern Analysis System</p>
      </div>
    </div>
  );
}

export default Dashboard;