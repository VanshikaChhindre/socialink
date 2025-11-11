import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BarChart3, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

const navigate = useNavigate();

  return (
    <div className="relative min-h-screen mt-16 bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mb-24 p-4">
      {/* Text */}
      <div className="space-y-8 ml-6 md:ml-[90px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700">Trusted by 10,000+ marketers</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl tracking-tight text-gray-900">
                Manage all your social media
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> in one place</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Schedule posts, analyze performance, and engage with your audience across all platforms. Save time and grow your brand with powerful automation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
              onClick={() => navigate('/sign-up')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-xl group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-gray-900">Smart Scheduling</div>
                  <div className="text-sm text-gray-600">Post at optimal times</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900">Analytics Dashboard</div>
                  <div className="text-sm text-gray-600">Track your growth</div>
                </div>
              </div>
            </div>
          </div>

       {/* Image */}
      <div className="order-2 md:order-2 flex justify-center">
          <div className="relative lg:h-[600px] h-[400px] w-[300px] md:w-[500px] mt-[50px] md:mt-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform rotate-3"></div>
                            <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/hero.avif"
                alt="Social Media Dashboard"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-green-600">↑</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                  <div className="text-gray-900">+127%</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-purple-600">⚡</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                  <div className="text-gray-900">15hrs/week</div>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
