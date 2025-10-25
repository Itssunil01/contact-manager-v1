import React, { useState } from "react";
import { loginError, loginSuccess } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = login;

    if (!username || !password) {
      loginError("All fields are required");
      return;
    }

    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/login`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        loginSuccess(message);
        localStorage.setItem("username", username);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        loginError(error);
      } else {
        loginError(message || error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      loginError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-6">
            <label className="block text-lg sm:text-2xl mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="John"
              className="w-full border rounded-md p-3 text-center focus:ring-2 focus:ring-blue-400 outline-none"
              value={login.username}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-lg sm:text-2xl mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              className="w-full border rounded-md p-3 text-center focus:ring-2 focus:ring-blue-400 outline-none"
              value={login.password}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-32 sm:w-40 h-10 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>

            <p className="text-base sm:text-lg mt-4 text-gray-700">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
