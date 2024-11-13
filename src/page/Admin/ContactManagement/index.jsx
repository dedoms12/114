import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiMail, FiPhone, FiMessageSquare, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const ContactManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const contactStats = [
    {
      icon: FiMail,
      count: '156',
      label: 'Total Inquiries',
      buttonClass: 'bg-blue-50 text-blue-600'
    },
    {
      icon: FiMessageSquare,
      count: '23',
      label: 'Pending Responses',
      buttonClass: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: FiPhone,
      count: '45',
      label: 'Support Tickets',
      buttonClass: 'bg-green-50 text-green-600'
    }
  ];

  const inquiries = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      subject: 'Medicine Availability Query',
      message: 'I would like to inquire about the availability of...',
      status: 'pending',
      date: '2024-03-15'
    },
    // Add more inquiries as needed
  ];

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Contact Management</h1>
            <p className="text-sm text-gray-600">Manage customer inquiries and support tickets</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {contactStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-gray-600" />
                  <div className="text-2xl font-bold">{stat.count}</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">{stat.label}</div>
                <button className={`w-full py-2 rounded-lg text-sm font-medium ${stat.buttonClass}`}>
                  View Details →
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => setSelectedFilter('all')}
                >
                  All Inquiries
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedFilter === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-600'
                  }`}
                  onClick={() => setSelectedFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedFilter === 'resolved' ? 'bg-green-50 text-green-600' : 'text-gray-600'
                  }`}
                  onClick={() => setSelectedFilter('resolved')}
                >
                  Resolved
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                      <div className="text-sm text-gray-500">{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{inquiry.subject}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inquiry.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{inquiry.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
