// signupApi.js
import axios from "axios";

const SignUpAuth = async (
  formData,
  onAuthentication,
  setLoadingScreen,
  navigate,
  setIsNewUser
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

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userData)
      );
      onAuthentication();
      setLoadingScreen(false);
      navigate("/choose");
    } else if (response.status === 201) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify(response.data.userData)
      );
      setLoadingScreen(false);
      alert(
        "Account is Already ragistered with this Email Address  Please Set Your Password"
      );
      setIsNewUser(true);
    } else {
      setLoadingScreen(false);
      console.error("Signup failed with status code:", response.status);
    }
  } catch (error) {
    setLoadingScreen(false);
    alert("User is Already Ragistered with this Email Address Please Login");
    setIsNewUser(false);
    navigate("/login");
  }
};

export default SignUpAuth;
