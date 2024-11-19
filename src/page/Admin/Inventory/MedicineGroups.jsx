import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiSearch, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useState } from 'react';

const MedicineGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for pharmacies (replace with real data later)
  const pharmacies = [
    {
      id: 1,
      name: "MedTech Solutions Pharmacy",
      address: "123 Main Street, Quezon City",
      phone: "+63 912 345 6789",
      email: "medtech@example.com",
      licenseNumber: "PHA-2024-001",
      status: "active",
      medicineGroups: ["Medical Supplies", "Personal Care"]
    },
    {
      id: 2,
      name: "Healthcare Plus Drugstore",
      address: "456 Park Avenue, Makati City",
      phone: "+63 923 456 7890",
      email: "healthcare@example.com",
      licenseNumber: "PHA-2024-002",
      status: "inactive",
      medicineGroups: ["Supplements", "Personal Care"]
    }
  ];

  const checkBlacklistStatus = (pharmacy) => {
    // Get blacklisted stores from localStorage or your data source
    const blacklistedEntities = JSON.parse(localStorage.getItem('blacklistedEntities') || '{"stores":[]}');
    const isBlacklisted = blacklistedEntities.stores.some(
      (blacklistedStore) => blacklistedStore.name === pharmacy.name && blacklistedStore.status === 'blacklisted'
    );
    return isBlacklisted ? 'blacklisted' : pharmacy.status;
  };

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Registered Pharmacies</h1>
            <p className="text-sm text-gray-600">View and manage registered pharmacy partners</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search pharmacies by name or location..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Pharmacies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{pharmacy.name}</h2>
                    <span className="text-sm text-gray-500">License: {pharmacy.licenseNumber}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    checkBlacklistStatus(pharmacy) === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : checkBlacklistStatus(pharmacy) === 'blacklisted'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {checkBlacklistStatus(pharmacy)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{pharmacy.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{pharmacy.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{pharmacy.email}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Medicine Groups:</p>
                  <div className="flex flex-wrap gap-2">
                    {pharmacy.medicineGroups.map((group, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineGroups;
