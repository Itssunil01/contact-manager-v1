import React, { useState, useEffect } from "react";
import { editError, editSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [data, setData] = useState({
    title: "",
    email: "",
    phone: "",
  });

  // Load contact from localStorage
  useEffect(() => {
    const contactToEdit = JSON.parse(localStorage.getItem("editContact"));
    if (contactToEdit) setData(contactToEdit);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, email, phone } = data;

    if (!title || !email || !phone) return editError("All fields required");
    if (phone.length !== 10) return editError("Phone number must be 10 digits");

    const key = `listings_${username}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const updated = saved.map((item) => (item.email === email ? data : item));

    localStorage.setItem(key, JSON.stringify(updated));
    editSuccess("Contact updated successfully!");

    localStorage.removeItem("editContact");
    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
          Edit Your Contact
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-lg sm:text-xl mb-2">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded-md p-3 text-center focus:ring-2 focus:ring-blue-400 outline-none"
              value={data.title}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg sm:text-xl mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-md p-3 text-center bg-gray-100 cursor-not-allowed"
              value={data.email}
              onChange={handleChange}
              readOnly
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg sm:text-xl mb-2">Phone Number</label>
            <input
              type="number"
              name="phone"
              className="w-full border rounded-md p-3 text-center focus:ring-2 focus:ring-blue-400 outline-none"
              value={data.phone}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-28 sm:w-32 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
