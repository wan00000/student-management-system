"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function GetD() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-mono text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          WELCOME TO STUDENT MANAGEMENT SYSTEM
        </h1>
      </div>
    </div>
  );
}

export default GetD;
