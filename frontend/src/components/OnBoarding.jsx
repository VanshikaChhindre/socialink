import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, setCredentials} from "../features/auth/authSlice";
import { useCurrentUserQuery } from "../features/auth/authApiSlice"

const platforms = [
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶",
    color: "#FF0000",
    bgColor: "bg-red-50",
    description: "Connect your YouTube channel to schedule videos and track analytics",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📷",
    color: "#E4405F",
    bgColor: "bg-pink-50",
    description: "Link your Instagram account to post photos, stories, and reels",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "f",
    color: "#1877F2",
    bgColor: "bg-blue-50",
    description: "Connect Facebook to manage posts and pages in one place",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "𝕏",
    color: "#000000",
    bgColor: "bg-gray-50",
    description: "Link your X account to schedule tweets and monitor engagement",
  },
  {
    id: "Linkedin",
    name: "Linkedin",
    icon: "in",
    color: "#000000",
    bgColor: "bg-gray-50",
    description: "Link your linkedin account to schedule posts and monitor engagement",
  },
];

export default function OnboardingConnect() {
  const [connectedPlatforms, setConnectedPlatforms] = useState(new Set());
  const [isConnecting, setIsConnecting] = useState(null);

  const handleConnect = async (platformId) => {
    setIsConnecting(platformId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConnectedPlatforms((prev) => new Set(prev).add(platformId));
    setIsConnecting(null);
  };

  const handleDisconnect = (platformId) => {
    setConnectedPlatforms((prev) => {
      const newSet = new Set(prev);
      newSet.delete(platformId);
      return newSet;
    });
  };

  const handleContinue = () => {
    if (connectedPlatforms.size > 0) {
      alert(
        `Connected to ${connectedPlatforms.size} platform(s)! Ready to manage your social media.`
      );
    }
  };


  const dispatch = useDispatch();
  const { data: userData, isSuccess } = useCurrentUserQuery();
  useEffect(() => {
    if (isSuccess && userData) {
      dispatch(setCredentials({user:userData, token: null}))
    }
  }, [isSuccess, userData])

  //authorizing user
  const user = useSelector(selectCurrentUser);

  return (
    <>
    {user? (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-4xl lg:text-5xl mb-4 text-gray-900">
            Connect Your Social Media
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Link your social media accounts to start managing all your content
            from one powerful dashboard
          </p>
        </div>

        {/* Connection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {platforms.map((platform) => {
            const isConnected = connectedPlatforms.has(platform.id);
            const isLoading = isConnecting === platform.id;

            return (
              <div
                key={platform.id}
                className={`p-6 rounded-2xl shadow-md transition-all duration-200 border-2 ${
                  isConnected
                    ? "border-green-500 bg-green-50/50"
                    : "border-gray-200 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${platform.bgColor} rounded-xl flex items-center justify-center text-2xl`}
                      style={{ color: platform.color }}
                    >
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900">{platform.name}</h3>
                      {isConnected && (
                        <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                          <Check className="w-4 h-4" />
                          <span>Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 min-h-[48px]">
                  {platform.description}
                </p>

                {isConnected ? (
                  <button
                    className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-800"
                    onClick={() => handleDisconnect(platform.id)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    onClick={() => handleConnect(platform.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Connecting...
                      </span>
                    ) : (
                      "Connect"
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {connectedPlatforms.size === 0
              ? "Connect at least one platform to continue"
              : `${connectedPlatforms.size} ${
                  connectedPlatforms.size === 1 ? "platform" : "platforms"
                } connected`}
          </p>
          <div className="flex gap-3">
            <button className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-800">
              Skip for now
            </button>
            <button
              className={`py-2 px-6 rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${
                connectedPlatforms.size === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={connectedPlatforms.size === 0}
              onClick={handleContinue}
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
    ):(
      <div className='w-full min-h-screen text-6xl flex items-center justify-center'>
       <h1 className=''>Login to use Channel</h1>
     </div>
    )}
    </>
  );
}
