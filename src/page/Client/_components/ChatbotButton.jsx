import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

const ChatbotButton = ({ onClick }) => {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.elementsFromPoint(
        window.innerWidth - 100,
        window.innerHeight - 100
      );
      
      const hasTextElement = elements.some(el => 
        el.tagName !== 'BUTTON' && 
        window.getComputedStyle(el).getPropertyValue('text-overflow') === 'ellipsis'
      );
      
      setIsTransparent(hasTextElement);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 bg-[#4C9BF5] rounded-full shadow-lg 
        flex items-center justify-center hover:bg-blue-600 transition-all z-50
        ${isTransparent ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
      aria-label="Open chatbot"
    >
      <FaComments className="w-6 h-6 text-white" />
    </button>
  );
};

export default ChatbotButton; 