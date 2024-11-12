import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/Admin/monke.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold text-white">Subarashi</div>
            <div className="text-xs text-green-400">Super Admin</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-[#2A3547] rounded-full transition-colors"
        >
          <FiMoreVertical className="w-5 h-5 text-white" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50">
          <Link
            to="/admin/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <FiUser className="w-4 h-4" />
            <span>My Profile</span>
          </Link>
          <button
            onClick={() => {/* Add logout logic here */}}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-50 w-full"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 