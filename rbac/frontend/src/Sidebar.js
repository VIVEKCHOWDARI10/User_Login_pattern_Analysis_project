import React from "react";

function Sidebar({ menus }) {
  return (
    <div
      style={{
        width: "250px",
        background: "#003f8a",
        color: "white",
        height: "100vh",
        padding: "20px"
      }}
    >
      <h2>Menu</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menus.map((menu) => (
          <li
            key={menu.route_path}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            {menu.menu_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;