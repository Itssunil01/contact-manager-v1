import React, { useState } from "react";
import { signupError, signupSuccess } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = signup;

    if (!username || !email || !password) {
      return signupError("All fields are required");
    }

    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/signup`;
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        signupSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        signupError(error);
      } else {
        signupError(message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      signupError("Server error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F0FFFF] px-4 py-10">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-lg sm:text-xl font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="John"
              required
              className="border border-gray-300 rounded-md p-2 sm:p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signup.username}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-lg sm:text-xl font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              required
              className="border border-gray-300 rounded-md p-2 sm:p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signup.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-lg sm:text-xl font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••"
              required
              className="border border-gray-300 rounded-md p-2 sm:p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signup.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="h-10 sm:h-12 w-28 sm:w-32 text-white bg-blue-500 hover:bg-blue-600 transition-colors rounded-full shadow-md"
            >
              Sign Up
            </button>
            <p className="text-base sm:text-lg mt-3 text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
