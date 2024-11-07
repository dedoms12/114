import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRobot, FaPaperPlane, FaCog, FaArrowLeft } from 'react-icons/fa';
import NavBar from '../_components/navbar';

const ChatbotPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const quickActions = [
    {
      icon: "🏥",
      title: "Ampayon",
      description: "Closest pharmacy in your location"
    },
    {
      icon: "👋",
      title: "Say Hello....",
      description: "Start asking questions now..."
    },
    {
      icon: "💊",
      title: "Most Sold Medicine",
      description: "Ask what type of medicine to take"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => navigate(-1)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FaArrowLeft size={20} />
              </button>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <FaRobot size={32} className="text-white" />
              </div>
              <div className="w-5" /> {/* Spacer */}
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-semibold mb-2">Hi, User 1</h1>
              <p className="text-white/80">
                Ready to assist you with anything you need, from answering
                questions to providing recommendations.
              </p>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all text-left"
                >
                  <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                    <span className="text-2xl">{action.icon}</span>
                  </div>
                  <h3 className="font-medium mb-1 text-gray-800">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Section */}
          <div className="p-6 border-t border-gray-100 min-h-[300px]">
            <div className="space-y-4 mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-4 items-center">
              <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                <FaCog className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask PillPoint anything..."
                  className="w-full px-6 py-3 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2">
                  Send <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
