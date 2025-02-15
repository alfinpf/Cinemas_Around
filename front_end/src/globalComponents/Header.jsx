import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "mydarktheme";
    const newTheme =
      currentTheme === "mydarktheme" ? "mylighttheme" : "mydarktheme";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navigate = useNavigate();

  async function handleClick() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_API_URI}/users/logout`);
      console.log(response);
    } catch (error) {
    console.log(error);
    }
  }

  return (
    <div className="navbar bg-primary fixed  z-50 text-white">
      <div className="flex-1">
        <img
          onClick={() => navigate("/")}
          className="h-12"
          src="/logo.png"
          alt="logo"
        />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="text-lg">Profile</summary>
              <ul className=" bg-primary rounded-t-none p-2">
                <li>
                  <a onClick={toggleTheme}>Switch theme</a>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a onClick={handleClick} className="text-red-600">
                    Logout
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
