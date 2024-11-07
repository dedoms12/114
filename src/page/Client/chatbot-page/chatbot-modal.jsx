import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaRobot, FaPaperPlane } from 'react-icons/fa';

const ChatbotModal = ({ isOpen, onClose, onSendMessage }) => {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState('');

  const handleQuickAction = (action) => {
    onSendMessage(action.title);
    navigate('/chatbot', { state: { initialMessage: action.title } });
  };

  if (!isOpen) return null;

  const quickActions = [
    {
      icon: "🏥",
      title: "Find nearest pharmacy",
      description: "Locate pharmacies in Ampayon"
    },
    {
      icon: "👋",
      title: "Get assistance",
      description: "Start asking questions now"
    },
    {
      icon: "💊",
      title: "Popular medicines",
      description: "View most purchased medicines"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:w-[500px] sm:rounded-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <FaRobot className="w-6 h-6 text-[#4C9BF5]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hi, User 1</h2>
              <p className="text-sm text-gray-500">Can I help you with anything?</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="bg-gray-50 p-4 rounded-xl text-left hover:bg-gray-100 transition-colors"
              onClick={() => handleQuickAction(action)}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h3 className="font-medium mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Ask PillPoint anything..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-[#4C9BF5] text-white rounded-full hover:bg-blue-600 transition-colors">
            Send
          </button>
        </div>

        <button
          onClick={() => navigate('/chatbot')}
          className="w-full py-3 text-[#4C9BF5] font-medium hover:bg-blue-50 rounded-lg transition-colors"
        >
          Open Full Chat Assistance →
        </button>
      </div>
    </div>
  );
};

export default ChatbotModal;
