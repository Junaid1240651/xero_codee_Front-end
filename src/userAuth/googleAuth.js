// googleLogin.js
import axios from "axios";
import jwt_decode from "jwt-decode";

const GoogleAuth = (
  credentialResponse,
  setIsNewUser,
  onAuthentication,
  navigate
) => {
  setIsNewUser(false);

  var decoded = jwt_decode(credentialResponse.credential);
  var email = decoded.email;
  var firstName = decoded.given_name;
  var lastName = decoded.family_name;

  axios
    .post("https://xero-codee-backend.onrender.com/google-auth", {
      email,
      firstName,
      lastName,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userData)
      );
      onAuthentication();
      navigate("/choose");
    })
    .catch((error) => {
      localStorage.setItem(
        "userDetails",
        JSON.stringify(error.response.data.userData)
      );
      if (error) {
        // If the user is new, show the SetPassword component
        setIsNewUser(true);
      } else {
        console.error("Error sending Google data to backend:", error);
      }
    });
};

export default GoogleAuth;
