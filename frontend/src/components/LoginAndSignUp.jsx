import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function LoginAndSignUp() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  //   console.log(setShowPassword)

  const [userDetails, setDetails] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const isAllPresent = (str) => {
    var pattern = new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");

    if (!str || str.length === 0) {
      return false;
    }

    return pattern.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      if (!userDetails.password) {
        return toast.error("Please fill the password");
      } else if (!userDetails.email) {
        return toast.error("Please fill the email");
      } else {
        try {
          setIsLoading(true);

          let response = await axios.post(
            "https://kryzen-api.onrender.com/user/login",
            userDetails
          );
          toast.success("Login successful", {
            position: "top-right"
          });
          console.log("form", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("fullName", response.data.user);
          navigate("/form");
        } catch (error) {
          toast.error("Login failed. Please check your credentials.");
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      if (isAllPresent(userDetails.password)) {
        if (userDetails.fullName && userDetails.email) {
          try {
            await axios.post(
              "https://kryzen-api.onrender.com/user/registor",
              userDetails
            );
            console.log(userDetails);
            toast.success("Successfully Registered user", {
              position: "top-right"
            });
            handleToggleSignIn(true);
          } catch (error) {
            toast.error("Signup failed. Please try again.",{
              position:"top-right"
            });
          }
        } else {
          return toast.error("Please fill all the details", {
            position: "top-right"
          });
        }
      } else {
        return toast.error(
          "Password should include an uppercase and lowercase alphabet, a number, and a special character.",
          {
            position: "top-right"
          }
        );
      }
    }
  };

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: `url("https://images.jdmagicbox.com/comp/pune/l2/020pxx20.xx20.221129084005.u8l2/catalogue/kryzen-biotech-private-limited-wakad-pune-greenhouse-manufacturers-i0elbx7owu.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="fixed inset-0"></div>
        <div className="bg-[#155524] w-96 p-4 rounded-lg shadow-lg z-50 text-white relative">
          <button className="absolute top-2 right-2 text-gray-300 hover:text-white"></button>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">
              {isSignIn ? "Login" : "Sign Up"}
            </h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            {!isSignIn && (
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-left">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="fullName"
                  className="w-full p-2 border-none focus:border-none focus:bg-back focus:bg-opacity-40 focus:backdrop-blur-lg rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                  placeholder="Your full name"
                  onChange={(e) => handleFormInput(e)}
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border-none focus:border-none rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                placeholder="Your email"
                onChange={(e) => handleFormInput(e)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-left mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-2 border-none rounded-md bg-black bg-opacity-40 backdrop-blur-lg"
                placeholder="Your password"
                onChange={(e) => handleFormInput(e)}
                required
              />
            </div>
            <p className="text-xs mb-4">
              **Password should include an uppercase and lowercase alphabet, a
              number and a special character.
            </p>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-950 rounded-md w-full"
                disabled={isLoading}
              >
                {isLoading && (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Submitting...
                  </span>
                )}
                {!isLoading && (isSignIn ? "Login" : "Sign Up")}
              </button>
            </div>
            <div className="mt-4 text-center">
              {isSignIn ? (
                <div>
                  <p>
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="text-green-500 hover:underline"
                      onClick={handleToggleSignIn}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-green-500 hover:underline"
                    onClick={handleToggleSignIn}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginAndSignUp;
