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
const Dashboard = () => {
  const [selectedServices, setSelectedServices] = useState({});
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [userDetails, setUserDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
  });

  const handleServiceClick = (service, step) => {
    setSelectedServices((prevSelectedServices) => ({
      ...prevSelectedServices,
      [step]: service,
    }));

    if (service === "AWS" || service === "GCP") {
      setShowStep2(true);
      setShowStep3(showStep3 === true ? true : false);
    } else if (
      service === "Github" ||
      service === "Gitlab" ||
      service === "Bitbucket"
    ) {
      setShowStep3(true);
    }
  };
  console.log(selectedServices);
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
    // Check if the user has a valid JWT token stored in localStorage
    const token = localStorage.getItem("token");
    const parsedData = JSON.parse(localStorage.getItem("userDetails"));

    if (token) {
      setUserDetails(parsedData);
      // You should also validate the token on the server-side
      // For simplicity, we assume a token is valid if it exists in localStorage
    } else {
    }
  }, []);

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
          <div className="step-container">
            <motion.div
              animate={{ x: 0, y: 0, scale: 1 }}
              initial={{ scale: 0 }}
              className="step-container-content"
            >
              <div className="step-icon">
                <img src={scrollpoint} />
                <div className="step-indicator"></div>
              </div>
              <div>
                <p className="step-number">Step 1</p>
                <p>Connect To Cloud</p>
                <div className="service-list">
                  <div
                    className="service"
                    onClick={() => handleServiceClick("AWS", "step1")}
                  >
                    <p>Aws</p>
                    <img className="service-icon aws-icon" src={Aws} />
                  </div>
                  <div
                    className="service"
                    onClick={() => handleServiceClick("GCP", "step1")}
                  >
                    <p>GCP</p>
                    <img className="service-icon GCP-icon" src={GCP} />
                  </div>
                </div>
              </div>
            </motion.div>
            {showStep2 ? (
              <motion.div
                animate={{ x: 0, y: 0, scale: 1 }}
                initial={{ scale: 0 }}
                className={"step-container-content"}
              >
                <div className="step-icon">
                  <img src={scrollpoint} />
                  <div className="step-indicator"></div>
                </div>
                <div>
                  <p className="step-number">Step 2</p>
                  <p>Connect to Source Account</p>
                  <div className="service-list">
                    <div
                      onClick={() => handleServiceClick("Github", "step2")}
                      className="service"
                    >
                      <p>Github</p>
                      <img className="service-icon github-icon" src={Github} />
                    </div>
                    <div
                      onClick={() => handleServiceClick("Gitlab", "step2")}
                      className="service"
                    >
                      <p>Gitlab</p>
                      <img className="service-icon gitlab-icon" src={Gitlab} />
                    </div>
                    <div
                      onClick={() => handleServiceClick("Bitbucket", "step2")}
                      className="service"
                    >
                      <p>Bitbucket</p>
                      <img
                        className="service-icon bitbucket-icon"
                        src={Bitbucket}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
            )}
            {showStep3 ? (
              <motion.div
                animate={{ x: 0, y: 0, scale: 1 }}
                initial={{ scale: 0 }}
                className="step-container-content"
              >
                <div className="step-icon">
                  <img src={scrollpoint} />
                  <div className="step-indicator"></div>
                </div>
                <div>
                  <p className="step-number">Step 3</p>
                  <p>Connect to Data Source</p>
                  <div className="service-list">
                    <div
                      onClick={() => handleServiceClick("MongoDB", "step3")}
                      className="service"
                    >
                      <p>MongoDB</p>
                      <img
                        className="service-icon mongoDB-icon"
                        src={Mongodb}
                      />
                    </div>
                    <div
                      onClick={() => handleServiceClick("RedisDB", "step3")}
                      className="service"
                    >
                      <p>RedisDB</p>
                      <img className="service-icon redisDB-icon" src={Redis} />
                    </div>
                    <div
                      onClick={() => handleServiceClick("Postgresql", "step3")}
                      className="service"
                    >
                      <p>Postgresql</p>
                      <img
                        className="service-icon postgresql-icon"
                        src={Postgresql}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              ""
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
                  selectedServices
                    ? "selected-services"
                    : "selected-services-hidden"
                }
              >
                {selectedServices
                  ? Object.values(selectedServices).map(
                      (selectedService, index) => (
                        <motion.div
                          animate={{ x: 0, y: 0, scale: 1 }}
                          initial={{ scale: 0 }}
                          className="selected-service"
                          key={index}
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
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
