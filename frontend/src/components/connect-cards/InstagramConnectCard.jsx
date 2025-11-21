import React from 'react'
import { Check } from "lucide-react";


const InstagramConnectCard = ({isConnected, onDisconnect}) => {

  const handleInstagram = async() => {
   const res = await fetch("http://localhost:5000/instagram/me", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/on-boarding";
  }
  };

  return (
     <div
      className={`p-6 rounded-2xl shadow-md transition-all duration-200 border-2 ${
        isConnected ? "border-green-500 bg-green-50" : "border-gray-200 hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-7">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-2xl"
            style={{ color: "#0a66c2" }}
          >
            <img src='/instagram.png'
                    className='w-9 h-9'/>
          </div>
          <div>
            <h3 className="text-xl text-gray-900">Instagram</h3>
            {isConnected && (
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <Check className="w-4 h-4" />
                <span>Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-6">
        Link your Instagram account to schedule posts and monitor engagement
      </p>

      {isConnected ? (
        <button
          className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-800"
          onClick={onDisconnect}
        >
          Disconnect
        </button>
      ) : (
        <button
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          onClick={handleInstagram}
        >
          Connect
        </button>
      )}
    </div>
  )
}

export default InstagramConnectCard