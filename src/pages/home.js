import React from "react";
import "../css/home.css";
import Navbar from "../components/navbar";
import SidebarMenu from "../components/sidebarMenu";
import Dashboard from "../components/dashboard";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <SidebarMenu />
      <div className="home-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
