// passwordApi.js
import axios from "axios";

const CreatePasswordAuth = async (
  newUserPassword,
  onAuthentication,
  navigate,
  setIsNewUser,
  setLoadingScreen
) => {
  const parsedData = JSON.parse(localStorage.getItem("userDetails"));
  setLoadingScreen(true);
  try {
    const response = await axios.post(
      "https://xero-codee-backend.onrender.com/set-password",
      {
        email: parsedData.email,
        password: newUserPassword,
      }
    );

    if (response.status === 200) {
      await localStorage.setItem("token", response.data.token);
      setIsNewUser(false);
      setLoadingScreen(false);
      onAuthentication();

      navigate("/choose");
    }
  } catch (error) {
    console.error("Failed to set password:", error.response.data.message);
  }
};
export default CreatePasswordAuth;
