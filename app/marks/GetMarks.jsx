"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function GetMarks() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/user/marks")
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching marks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-mono">Loading...</h1>
      </div>
    );
  }

  if (details.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl font-mono">No marks data available.</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Marks Overview</h1>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 p-4 bg-gray-800 text-white font-semibold uppercase">
            <div>Email</div>
            <div>Test</div>
            <div>Cloud Computing</div>
            <div>Network Security</div>
            <div>Artificial Intelligence</div>
            <div>Data Structure</div>
            <div>Python Programming</div>
            <div>Total</div>
          </div>
          {/* Marks Rows */}
          {details.map((detail, index) => (
            <div
              key={index}
              className="grid grid-cols-8 gap-4 p-4 bg-gray-100 hover:bg-gray-200 transition-colors border-b"
            >
              <div className="truncate">{detail.email}</div>
              <div>{detail.testname}</div>
              <div>{detail.graphics}</div>
              <div>{detail.iot}</div>
              <div>{detail.webtech}</div>
              <div>{detail.stlab}</div>
              <div>{detail.project}</div>
              <div>
                {[
                  detail.graphics,
                  detail.iot,
                  detail.webtech,
                  detail.stlab,
                  detail.project,
                ]
                  .map(Number)
                  .reduce((sum, val) => sum + val, 0)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/marks/post")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Marks
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetMarks;
