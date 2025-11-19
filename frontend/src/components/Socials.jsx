// src/pages/Socials.jsx

import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

import { Plus, TrendingUp, Calendar, Users, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Socials() {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-4xl">
        Please log in first
      </div>
    );
  }

  // Map platform config
  const platformsConfig = {
    linkedin: {
      id: "linkedin",
      name: "LinkedIn",
      icon: "in",
      color: "#0a66c2",
      bgColor: "bg-blue-50",
    },
    youtube: {
      id: "youtube",
      name: "YouTube",
      icon: "▶",
      color: "#FF0000",
      bgColor: "bg-red-50",
    },
    twitter: {
      id: "twitter",
      name: "X (Twitter)",
      icon: "𝕏",
      color: "#000000",
      bgColor: "bg-gray-100",
    },
  };

  // Read connected accounts from DB user
  const connectedPlatforms = Object.keys(
    user.connectedAccounts || {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 mt-16">
      <main className=" mx-auto px-6 py-8">
        {/* WELCOME */}
        <div className="mb-10">
          <h2 className="text-3xl text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">
            Here’s what’s happening with your connected accounts today.
          </p>
        </div>

        {/* CONNECTED PLATFORMS */}
        <div className="mb-12">
          <h3 className="text-xl text-gray-900 mb-6">Your Connected Accounts</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedPlatforms.map((platformId) => {
              const data = platformsConfig[platformId];
              const connectedData = user.connectedAccounts[platformId];

              return (
                <div
                  key={data.id}
                  className="p-6 hover:shadow-lg transition-all duration-200 rounded-xl border-2 border-purple-200 hover:border-purple-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${data.bgColor} rounded-xl flex items-center justify-center text-xl`}
                        style={{ color: data.color }}
                      >
                        {data.icon}
                      </div>
                      <div>
                        <h4 className="text-gray-900">{data.name}</h4>
                        <p className="text-sm text-green-600">Connected</p>
                      </div>
                    </div>

                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Email</span>
                      </div>
                      <span className="text-gray-900">
                        {connectedData.email || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>Linked</span>
                      </div>
                      <span className="text-green-600">Yes</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Expiry</span>
                      </div>
                      <span className="text-gray-900">
                        {connectedData.expiresAt
                          ? new Date(connectedData.expiresAt).toLocaleDateString()
                          : "Unknown"}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 border border-neutral-300 py-2 rounded-xl cursor-pointer hover:border-purple-300 hover:bg-purple-50">
                    Schedule Post
                  </button>
                </div>
              );
            })}

            {/* ADD MORE CARD */}
            <div
              className="p-6 flex flex-col border-2 rounded-xl border-dashed border-gray-300 hover:border-purple-400 transition-all duration-200 cursor-pointer bg-gray-50/50 hover:bg-purple-50/50 flex items-center justify-center min-h-[260px]"
              onClick={() => navigate("/on-boarding")}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Add More Accounts</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Connect more platforms
                </p>
              </div>
              <button
                  className="w-full mt-4 border border-purple-300 py-2 rounded-xl text-purple-600 hover:bg-purple-50"
                >
                  Connect Account
              </button>
            </div>
          </div>
        </div>
          
        <div className="mb-8">
          <h3 className="text-xl text-gray-900 mb-6">
            Quick Overview
          </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/*total post */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border rounded-lg border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-blue-700">
                  Total Posts
                </span>
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl text-blue-900">
               23
              </p>
              <p className="text-xs text-blue-600 mt-1">
                This month
              </p>
        </div>

        {/*schedule posts */}
        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border rounded-lg border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-orange-700">
                  Scheduled Posts
                </span>
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <p className="text-3xl text-orange-900">12</p>
              <p className="text-xs text-orange-600 mt-1">
                Next 7 days
              </p>
        </div>
        </div>
        </div>
      </main>
    </div>
  );
}
