import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import scrollpoint from "../images/scrollpoint.png";
import details from "../images/details.png";
import Aws from "../images/aws.png";
import GCP from "../images/cloud.png";
import Github from "../images/github2.png";
import Gitlab from "../images/gitlab.png";
import Bitbucket from "../images/bitbucket.png";
import Mongodb from "../images/mongodb.png";
import Redis from "../images/redis.png";
import Postgresql from "../images/postgresql.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

const serviceImages = {
  AWS: Aws,
  GCP: GCP,
  Github: Github,
  Gitlab: Gitlab,
  Bitbucket: Bitbucket,
  MongoDB: Mongodb,
  RedisDB: Redis,
  Postgresql: Postgresql,
};

const serviceData = [
  {
    step: "step1",
    services: ["AWS", "GCP"],
    icons: [Aws, GCP],
  },
  {
    step: "step2",
    services: ["Github", "Gitlab", "Bitbucket"],
    icons: [Github, Gitlab, Bitbucket],
  },
  {
    step: "step3",
    services: ["MongoDB", "RedisDB", "Postgresql"],
    icons: [Mongodb, Redis, Postgresql],
  },
];

const Dashboard = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [showSteps, setShowSteps] = useState([true, false, false]);
  const [percentage, setPercentage] = useState(0);
  const [userDetails, setUserDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });

  useEffect(() => {
    const selectedServiceCount = Object.values(selectedServices).filter(
      (service) => !!service
    ).length;

    let stepPercentage;
    if (selectedServiceCount === 0) {
      stepPercentage = 0;
    } else if (selectedServiceCount === 1) {
      stepPercentage = 40;
    } else if (selectedServiceCount === 2) {
      stepPercentage = 80;
    } else {
      stepPercentage = 100;
    }

    setPercentage(stepPercentage);
  }, [selectedServices]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const parsedData = JSON.parse(localStorage.getItem("userDetails"));

    if (token) {
      setUserDetails(parsedData);
    }
  }, []);

  const handleServiceClick = (service, step) => {
    setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [step]: service,
    }));

    if (service === "AWS" || service === "GCP") {
      setShowSteps([true, true, showSteps[2] === true ? true : false]);
    } else if (
      service === "Github" ||
      service === "Gitlab" ||
      service === "Bitbucket"
    ) {
      setShowSteps([true, true, true]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <p>
          Hi{" "}
          {userDetails
            ? userDetails.firstName + " " + userDetails.lastName
            : ""}
        </p>
        <p>Welcome To XeroCodee Ecosystem</p>
      </div>
      <div className="steps-container">
        <div className="steps-container-content">
          {serviceData.map(
            (stepData, index) =>
              showSteps[index] && (
                <motion.div
                  key={stepData.step}
                  animate={{ x: 0, y: 0, scale: 1 }}
                  initial={{ scale: 0 }}
                  className="step-container-content"
                >
                  <div className="step-icon">
                    <img src={scrollpoint} />
                    <div className="step-indicator"></div>
                  </div>
                  <div>
                    <p className="step-number">Step {index + 1}</p>
                    <p>
                      Connect to{" "}
                      {stepData.step === "step1"
                        ? "Cloud"
                        : stepData.step === "step2"
                        ? "Source Account"
                        : "Data Source"}
                    </p>
                    <div className="service-list">
                      {stepData.services.map((service, serviceIndex) => (
                        <div
                          key={service}
                          onClick={() =>
                            handleServiceClick(service, stepData.step)
                          }
                          className={`service ${
                            selectedServices[stepData.step] === service
                              ? "selected"
                              : ""
                          }`}
                        >
                          <p>{service}</p>
                          <img
                            className={`service-icon ${service.toLowerCase()}-icon`}
                            src={stepData.icons[serviceIndex]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </div>
        <div className="progress-container">
          <div className="progress-info-content">
            <div className="progress-info">
              <p>Your Progress</p>
              <p>towards XeroCodee</p>
              <div className="circular-progressbar-container">
                <CircularProgressbar
                  className="circular-progressbar"
                  strokeWidth={13}
                  value={percentage}
                  text={`${percentage}%`}
                  styles={buildStyles({
                    trailColor: "rgba(199, 206, 255, 1)",
                    textColor: "black",
                  })}
                />
              </div>
              <button className="view-details-button">View Details</button>
            </div>
            <div
              className={
                Object.keys(selectedServices).length > 0
                  ? "selected-services"
                  : "selected-services-hidden"
              }
            >
              {Object.entries(selectedServices).map(
                ([step, selectedService], index) => (
                  <motion.div
                    key={index}
                    animate={{ x: 0, y: 0, scale: 1 }}
                    initial={{ scale: 0 }}
                    className="selected-service"
                  >
                    <p className="step-numberr">Step {index + 1}</p>
                    <div className="service-details">
                      <div className="service-info">
                        <p>{selectedService}</p>
                        <p>Status complete</p>
                      </div>
                      <div className="service-icons">
                        <img src={serviceImages[selectedService]} />
                        <div className="details-icons">
                          <img src={details} />
                          <img src={details} />
                          <img src={details} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
