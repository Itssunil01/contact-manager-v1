import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { createError, createSuccess } from "../utils/utils";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [create, setCreate] = useState({
    title: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreate({ ...create, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(create);

    const { title, email, phone } = create;

    if (!title || !email || !phone) {
      return createError("All Fields Are Required");
    }

    if(phone.length > 10 || phone.length < 10){
      return createError("Phone-no must not exceed 10 digits")
    }

    const username = localStorage.getItem("username")
    const key = `listings_${username}`;

    // Get previous listings
    const existing = JSON.parse(localStorage.getItem(key)) || [];

    // Add new listing
    const updated = [...existing, create];

    // Save to localStorage
    localStorage.setItem(key, JSON.stringify(updated));

    console.log("Saved data:", JSON.parse(localStorage.getItem(key)));

    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/create`;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(create),
      });

      const result = await response.json();
      console.log(result);

      const { success, message, error } = result;

      if (success) {
        createSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        createError(error);
      } else {
        createError(message || error || "error");
      }
    } catch (err) {
      createError(err);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-[15%] space-y-4">
        <div className=" h-auto p-6 border-2 rounded-lg">
          <h1 className="text-2xl m-2 text-center">ADD YOUR CONTACT</h1>
          <form action="" onSubmit={handelSubmit}>
            <div className="m-4">
              <label htmlFor="" className="text-xl ">
                TITLE :{" "}
              </label>
              <input
                type="text"
                name="title"
                id=""
                className="border-1 rounded-sm text-center"
                value={create.title}
                onChange={handleChange}
              />
            </div>
            <div className=" m-4">
              <label htmlFor="" className="text-xl ">
                EMAIL :{" "}
              </label>
              <input
                type="text"
                name="email"
                id=""
                className="border-1 rounded-sm text-center"
                value={create.email}
                onChange={handleChange}
              />
            </div>
            <div className=" m-4">
              <label htmlFor="" className="text-xl ">
                PHONE-NO :{" "}
              </label>
              <input
                type="number"
                name="phone"
                id=""
                className="border-1 rounded-sm text-center"
                value={create.phone}
                onChange={handleChange}
              />
            </div>
            <div className="text-center mx-[40%] my-[5%] w-14 border-2 rounded-full">
              <button>ADD</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Create;
