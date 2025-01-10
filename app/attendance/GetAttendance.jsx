"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { removeDuplicates, stringToList } from "../../utils/main";
import { useRouter } from "next/navigation";

function GetAttendance() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/user/attendance")
      .then((res) => {
        setDetails(res.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching attendance data:", err);
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

  if (details.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">No attendance records found.</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Student Attendance</h1>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 bg-purple-600 text-white font-semibold p-4 rounded-t-md">
          <div>Email</div>
          <div>Absent</div>
          <div>On Duty</div>
        </div>
        {/* Attendance Data */}
        {details.map((detail) => (
          <div
            key={detail.email}
            className="grid grid-cols-3 gap-4 bg-purple-100 hover:bg-purple-200 transition-colors p-4 border-b"
          >
            <div className="truncate">{detail.email}</div>
            <div>{removeDuplicates(stringToList(detail.absent))}</div>
            <div>{detail.OD}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/attendance/post")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Attendance
        </button>
      </div>
    </div>
  );
}

export default GetAttendance;
