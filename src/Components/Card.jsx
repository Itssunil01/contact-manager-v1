import React from "react";

function Card({ title, email, phone, onDelete, onEdit }) {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 m-4 w-80 shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Title: {title}</h2>
      <p className="text-gray-600 mb-1">Email: {email}</p>
      <p className="text-gray-600">Phone: +91-{phone}</p>
      <div className="m-2 space-x-4">
        <button
          className="w-16 text-white bg-blue-500 border-1 rounded-full mt-4"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="w-16 text-white bg-red-500 border-1 rounded-full mt-4"
          onClick={() => onDelete(email)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
