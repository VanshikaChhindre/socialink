import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  TrendingUp,
  Eye,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';


const InstagramDashboard = () => {
const user = useSelector(selectCurrentUser);
const data = user.connectedAccounts.instagram;
const navigate = useNavigate();

const [mediaData, setMediaData] = useState(null)

const getData = async () => {
try {
const res = await fetch("http://localhost:5000/instagram/media", {
method: "GET",
credentials: "include",
});

  const json = await res.json();
  return json;
} catch (err) {
  console.error("Failed to fetch:", err);
  return null;
}

};

useEffect(() => {
    (async () => {
        const result = await getData();
        setMediaData(result);
    })();
}, []);

console.log(mediaData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 mt-16">
     <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 px-8">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-2 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={()=>navigate('/socials')}
                className="flex items-center justify-center gap-1 hover:bg-gray-100 p-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <img src={data.picture}
                  className='w-10 h-10 rounded-lg'/>
                </div>
                <div>
                  <h1 className="text-xl text-gray-900">
                    {data.username}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
             <p className='font-semibold'>Followers :</p>{data.followCount}
            </div>
            <div className="flex items-center gap-4">
             <p className='font-semibold'>Posts :</p>{data.mediaCount}
            </div>
            <div className="flex items-center gap-4">
              <button className='flex items-center justify-center '>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className='flex items-center justify-center'>
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>
      <div>    
    <div className="p-8">
        {!mediaData ? (
            <p className="text-gray-500">Fetching media...</p>
        ) : (
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mediaData?.data?.map((item) => (
                <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition"
                >
                {/* Thumbnail */}
                {item.media_type === "VIDEO" ? (
                    <video
                    controls
                    preload="metadata"
                    src={item.media_url}
                    className="w-full h-60 object-cover"
                    ></video>
                ) : (
                    <img
                    src={item.media_url}
                    alt={item.caption || "Instagram post"}
                    className="w-full h-60 object-cover"
                    />
                )}

                {/* Content */}
                <div className="p-4">
                    <p className="text-sm font-medium text-gray-800 mb-2">
                    {item.caption || "No caption"}
                    </p>

                    <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                    </p>
                </div>
                </div>
            ))}
            </div>
        )}

    </div>
  </div>
</div>
  )
}

export default InstagramDashboard