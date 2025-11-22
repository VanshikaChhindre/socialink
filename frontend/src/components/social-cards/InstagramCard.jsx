import React from 'react'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { TrendingUp, Calendar, Users, MoreVertical } from "lucide-react";
import { useNavigate } from 'react-router-dom';


const InstagramCard = () => {
  const user = useSelector(selectCurrentUser);
  const data = user.connectedAccounts.instagram;

  const navigate = useNavigate();
  return (
               <div
                  key={data.instagramId}
                  className="p-6 hover:shadow-lg transition-all duration-200 rounded-xl border-2 border-purple-200 hover:border-purple-300"
                >
                <div className='w-full font-semibold flex items-center justify-center gap-2 mb-4'>
                    <img src='/instagram.png'
                    className='w-6 h-6'/>
                    <h3 className='text-lg'>Instagram</h3>
                </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-amber-200">
                        <img
                        src={data.picture}
                        alt="instagram Profile"
                        className="w-full h-full object-cover bg-gray-400"
                        />
                    </div>
                      <div>
                        <h4 className="text-gray-900">{data.username}</h4>
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
                        <span>Followers</span>
                      </div>
                      <span className="text-gray-900">
                        {data.followCount || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>Posts</span>
                      </div>
                      <span className="text-green-600">{data.mediaCount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Expiry</span>
                      </div>
                      <span className="text-gray-900">
                        {data.expiresAt
                          ? new Date(data.expiresAt).toLocaleDateString()
                          : "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div  className="w-full mt-4 flex items-center justify-between gap-2">
                  <button 
                  className="w-1/2 border border-neutral-300 px-5 py-2 rounded-xl cursor-pointer hover:border-purple-300 hover:bg-purple-50"
                  onClick={()=>navigate('/ig-dashboard')}>
                    View Dashboard
                  </button>
                  <button className="w-1/2 border border-neutral-300 px-5 py-2 rounded-xl cursor-pointer hover:border-purple-300 hover:bg-purple-50">
                    Schedule Post
                  </button>
                  </div>
                </div>
  )
}

export default InstagramCard