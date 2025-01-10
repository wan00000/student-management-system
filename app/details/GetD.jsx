"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function GetD() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/user/details")
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setDetails(res.data);
        } else if (res.data && typeof res.data === "object") {
          console.warn("API returned an object instead of an array:", res.data);
          setDetails([res.data]); // Convert object to array
        } else {
          console.warn("Unexpected response format:", res.data);
          setDetails([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleNavigate = () => {
    router.push("/details/post"); // Navigate to the data input page
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <h1 className="font-mono text-2xl">{error}</h1>
      </div>
    );
  }

  if (details.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">No user details found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          User Details
        </h1>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 p-4 bg-gray-800 text-white text-sm font-bold uppercase">
            <div>Reg No</div>
            <div>Email</div>
            <div>Tutor</div>
            <div>Department</div>
            <div>Year</div>
            <div>Address</div>
            <div>Phone</div>
          </div>
          {/* Table Body */}
          {details.map((student, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
            >
              <div>{student.regNo}</div>
              <div>{student.email}</div>
              <div>{student.tutor}</div>
              <div>{student.department}</div>
              <div>{student.year}</div>
              <div>{student.address}</div>
              <div>{student.phone}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNavigate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add User Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetD;
