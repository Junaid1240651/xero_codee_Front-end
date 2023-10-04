import React, { useState } from "react";
import XeroLogo from "../images/xerologo.png";
import SearcIcon from "../images/searcIcon.png";
import Upgrade from "../images/upgrade.png";
import iconInfo from "../images/iconInfo.png";
import notifications from "../images/notifications.png";
import Settings from "../images/Settings.png";
import mail from "../images/mail.png";
import Arrow from "../images/arrow.png";
import "../css/navbar.css"; // Import your CSS file

const Navbar = ({ onAuthentication }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    onAuthentication();
  };
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="logo-container">
          <img src={XeroLogo} alt="XeroLogo" />
        </div>
        <div className="search-container">
          <input placeholder="Search" />
          <div className="search-icon">
            <img src={SearcIcon} alt="SearchIcon" />
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-icons">
          <div className="upgrade">
            <div className="upgrade-icon">
              <img src={Upgrade} alt="UpgradeIcon" />
            </div>
            <p>Upgrade Plan</p>
          </div>
          <div className="info-icon">
            <img src={notifications} alt="NotificationsIcon" />
          </div>
          <div className="info-icon">
            <img src={mail} alt="MailIcon" />
          </div>
          <div className="settings-info">
            <img src={Settings} alt="SettingsIcon" />
          </div>
        </div>
        <div className="xero-code">
          <div className="profileArrow" onClick={toggleDropdown}>
            <p>Xero Code</p>
            <img src={Arrow} alt="profileArrow" />
            {isOpen && (
            <div className="dropdown-content">
              <p className="Logout" onClick={handleClick}>
                Logout
              </p>
            </div>
          )}
          </div>
          
          <div className="info-icon">
            <img src={iconInfo} alt="InfoIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
