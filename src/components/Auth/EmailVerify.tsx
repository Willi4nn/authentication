import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../server/api";

export default function EmailVerify() {
  const [validUrl, setValidUrl] = useState(true);
  const [message, setMessage] = useState("");
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const response = await api.get(`/api/users/${id}/verify/${token}`);
        console.log(response.data);
        setValidUrl(true);
        setMessage(response.data.message);
      } catch (error: any) {
        console.log(error);
        setValidUrl(false);
        setMessage(error.response.data.message);
      }
    };
    verifyEmailUrl();
  }, [id, token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      {validUrl ? (
        <div className="text-center">
          <h1 className="text-xl font-bold text-green-500">{message}</h1>
          <Link to="/login">
            <button className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-500">{message}</h1>
          <Link to="/login">
            <button className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
