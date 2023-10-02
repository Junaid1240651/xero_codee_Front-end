// loginApi.js
import axios from "axios";

const LoginAuth = async (
  formData,
  onAuthentication,
  setLoadingScreen,
  navigate
) => {
  try {
    setLoadingScreen(true);

    const response = await axios.post(
      "https://xero-codee-backend.onrender.com/login",
      {
        email: formData.get("email"),
        password: formData.get("password"),
      }
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userData)
      );

      onAuthentication();
      setLoadingScreen(false);

      navigate("/choose");
    }
  } catch (error) {
    alert("Login failed. Please check your login details.");
    setLoadingScreen(false);
  }
};

export default LoginAuth;
