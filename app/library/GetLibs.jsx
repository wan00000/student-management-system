"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function GetAttendance() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/user/library")
      .then((res) => {
        setDetails(res.data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching library data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">Loading...</h1>
      </div>
    );
  }

  if (!details.student && !details.teacher) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">No records found.</h1>
      </div>
    );
  }

  const renderTable = (data, title) => (
    <div className="w-full flex flex-col items-center mb-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-10">{title}</h1>
      <div className="w-full max-w-6xl shadow-lg">
        <div className="grid grid-cols-4 gap-4 bg-gray-800 text-white font-semibold p-4 rounded-t-md">
          <div>Email</div>
          <div>Book Name</div>
          <div>Issued</div>
          <div>Returned</div>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-4 p-4 bg-gray-100 hover:bg-gray-200 transition-colors border-b"
          >
            <div className="truncate">{item.email}</div>
            <div className="truncate">{item.bookName}</div>
            <div>{item.issueDate}</div>
            <div>{item.returnDate}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {details.student && renderTable(details.student, "Student Library Records")}
      {details.teacher && renderTable(details.teacher, "Teacher Library Records")}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/library/post")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Library
        </button>
      </div>
    </div>
    
  );
}

export default GetAttendance;
