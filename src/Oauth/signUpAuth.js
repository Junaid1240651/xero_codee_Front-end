// signupApi.js
import axios from "axios";

const SignUpAuth = async (
  formData,
  onAuthentication,
  setLoadingScreen,
  navigate
) => {
  try {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    setLoadingScreen(true);

    const response = await axios.post(
      "https://xero-codee-backend.onrender.com/signUp",
      {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password,
      }
    );

    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userData)
      );
      onAuthentication();
      setLoadingScreen(false);
      navigate("/choose");
    } else {
      setLoadingScreen(false);
      console.error("Signup failed with status code:", response.status);
    }
  } catch (error) {
    setLoadingScreen(false);
    alert("Signup failed. Please check your signup details.");
  }
};

export default SignUpAuth;
