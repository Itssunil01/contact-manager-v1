import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import Card from "../Components/Card";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/footer";

function Home() {
  const username = localStorage.getItem("username");
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;
    const key = `listings_${username}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    setListings(saved);
  }, [username]);

  const handleDelete = (email) => {
    if (!username) return;
    const key = `listings_${username}`;
    const storedListings = JSON.parse(localStorage.getItem(key)) || [];
    const updatedListings = storedListings.filter(
      (item) => item.email !== email
    );
    localStorage.setItem(key, JSON.stringify(updatedListings));
    setListings(updatedListings);
  };

  const handleEdit = (contact) => {
    localStorage.setItem("editContact", JSON.stringify(contact)); //  Save contact for editing
    navigate("/edit");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center px-4 py-6 sm:px-6 lg:px-12 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center my-6">
          Hi there, <span className="text-blue-600">{username || "Guest"}</span>
        </h1>

        {/* Responsive Card Grid */}
        <div
          className="
            grid 
            gap-6 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            justify-items-center
            w-full
            max-w-7xl
            mx-auto
          "
        >
          {listings.length > 0 ? (
            listings.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                email={item.email}
                phone={item.phone}
                onDelete={handleDelete}
                onEdit={() => handleEdit(item)}
              />
            ))
          ) : (
            <div className="text-gray-500 text-center text-lg mt-10 col-span-full">
              No contacts found. Click “Add Your Contact” to create one.
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
