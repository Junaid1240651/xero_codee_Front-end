import React, { useState } from "react";
import "../css/sidebarMenu.css";
import GridIcon from "../images/Grid.png";
import LayersIcon from "../images/Layers.png";
import ServicesIcon from "../images/services.png";
import DatabaseIcon from "../images/database.png";
import ClusterIcon from "../images/cluster.png";
import EnvironmentIcon from "../images/envirement.png";
import MonitoringIcon from "../images/monitoring.png";
import SecurityIcon from "../images/security.png";
import WebhookIcon from "../images/webhook.png";
import WorkflowIcon from "../images/workflow.png";
import ErrorIcon from "../images/error.png";

const SidebarMenu = () => {
  const [selectedItem, setSelectedItem] = useState(11);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const menuItems = [
    { index: 11, icon: GridIcon, text: "XeroCode" },
    { index: 0, icon: LayersIcon, text: "Builder Center" },
    { index: 1, icon: ServicesIcon, text: "Service Board" },
    { index: 3, icon: ClusterIcon, text: "Cluster" },
    { index: 4, icon: DatabaseIcon, text: "Databases" },
    { index: 5, icon: EnvironmentIcon, text: "Environment" },
    { index: 6, icon: WorkflowIcon, text: "Workflow" },
    { index: 7, icon: MonitoringIcon, text: "Monitoring" },
    { index: 8, icon: SecurityIcon, text: "Security" },
    { index: 9, icon: WebhookIcon, text: "Web Hooks" },
    { index: 10, icon: ErrorIcon, text: "Log Error" },
  ];

  return (
    <div className="sidebar-menu">
      {menuItems.map((item) => (
        <div className="sidebar-menu-content">
          <div
            key={item.index}
            className={`menu-item ${
              selectedItem === item.index ? "selected" : ""
            }`}
            onClick={() => handleItemClick(item.index)}
          >
            <img src={item.icon} alt={item.text} />
            <p>{item.text}</p>
          </div>
          <div
            className={selectedItem === item.index ? "sidebar-selectDiv" : ""}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default SidebarMenu;
