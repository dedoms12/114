import { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { 
  FiMail, FiPhone, FiMessageSquare, FiEdit2, 
  FiTrash2, FiSearch, FiFilter, FiEye, FiX 
} from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const ContactManagement = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      subject: 'Medicine Availability Query',
      message: 'I would like to inquire about the availability of Paracetamol in your pharmacy.',
      status: 'pending',
      date: '2024-03-15',
      priority: 'medium'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@example.com',
      subject: 'Prescription Refill Request',
      message: 'I need to refill my maintenance medication for hypertension.',
      status: 'resolved',
      date: '2024-03-14',
      priority: 'high'
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      email: 'p.reyes@example.com',
      subject: 'Delivery Inquiry',
      message: 'Do you offer medicine delivery services to Makati area?',
      status: 'pending',
      date: '2024-03-16',
      priority: 'low'
    },
    {
      id: 4,
      name: 'Ana Martinez',
      email: 'ana.m@example.com',
      subject: 'Price Inquiry',
      message: 'What is the current price of Insulin in your pharmacy?',
      status: 'pending',
      date: '2024-03-16',
      priority: 'high'
    },
    {
      id: 5,
      name: 'Carlos Gomez',
      email: 'carlos.g@example.com',
      subject: 'Operating Hours',
      message: 'Are you open during holidays? Specifically this coming Holy Week?',
      status: 'resolved',
      date: '2024-03-13',
      priority: 'medium'
    }
  ]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const contactStats = [
    {
      icon: FiMail,
      count: inquiries.length,
      label: 'Total Inquiries',
      buttonClass: 'bg-blue-50 text-blue-600'
    },
    {
      icon: FiMessageSquare,
      count: inquiries.filter(i => i.status === 'pending').length,
      label: 'Pending Responses',
      buttonClass: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: FiPhone,
      count: inquiries.filter(i => i.priority === 'high').length,
      label: 'High Priority',
      buttonClass: 'bg-red-50 text-red-600'
    }
  ];

  const handleStatusUpdate = (id, newStatus) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
      )
    );
    setShowViewModal(false);
  };

  const handleDelete = (id) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
    setShowDeleteModal(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      selectedFilter === 'all' || inquiry.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const ViewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Inquiry Details</h3>
          <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        {selectedInquiry && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{selectedInquiry.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{selectedInquiry.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <p className="mt-1 text-sm text-gray-900">{selectedInquiry.subject}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <p className="mt-1 text-sm text-gray-900">{selectedInquiry.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={selectedInquiry.status}
                onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <FiTrash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this inquiry? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedInquiry.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              <div 
                key={index} 
                data-tooltip-id={`contact-stat-${index}`}
                data-tooltip-content={`View ${stat.label.toLowerCase()} details and metrics`}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.buttonClass}`} />
                  <div className="text-2xl font-bold">{stat.count}</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">{stat.label}</div>
                <Tooltip id={`contact-stat-${index}`} place="top" />
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
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                {filteredInquiries.map((inquiry) => (
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
                      <button 
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setShowViewModal(true);
                        }}
                        data-tooltip-id="view-tooltip"
                        data-tooltip-content="View inquiry details"
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <FiEye className="w-4 h-4" />
                        <Tooltip id="view-tooltip" place="top" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedInquiry(inquiry);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
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

      {showViewModal && <ViewModal />}
      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  );
};

export default ContactManagement;
