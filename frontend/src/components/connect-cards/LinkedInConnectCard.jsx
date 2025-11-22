// src/components/socials/LinkedInConnectCard.jsx
import React from "react";
import { Check } from "lucide-react";

export default function LinkedInConnectCard({ isConnected, onDisconnect }) {

  const handleLinkedIn = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      redirect_uri: "http://localhost:5000/api/auth/linkedin/callback",
      scope: "openid profile w_member_social email"
    });

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
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
            <img
              src='/linkedin.png'
              className='w-9 h-9'
            />
          </div>
          <div>
            <h3 className="text-xl text-gray-900">LinkedIn</h3>
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
        Link your LinkedIn account to schedule posts and monitor engagement
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
          onClick={handleLinkedIn}
        >
          Connect
        </button>
      )}
    </div>
  );
}
