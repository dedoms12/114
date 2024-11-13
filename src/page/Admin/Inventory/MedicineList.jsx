import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import { useState } from 'react';

const MedicineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₱100', value: 'under100' },
    { label: '₱100 - ₱500', value: '100-500' },
    { label: '₱500 - ₱1000', value: '500-1000' },
    { label: 'Over ₱1000', value: 'over1000' }
  ];

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Medical Supplies', value: 'medical-supplies' },
    { label: 'Personal Care', value: 'personal-care' },
    { label: 'Supplements', value: 'supplements' }
  ];

  // Mock data for medicines (you'll need to replace this with real data)
  const medicines = [
    {
      id: 1,
      name: "Warmhouse 800D Electric Centrifuge Machine",
      seller: "MedTech Solutions",
      category: "Medical Supplies",
      price: 2349,
      stock: 30,
      status: "active"
    },
    {
      id: 2,
      name: "SISTERS Over Night Dry With Wings",
      seller: "Healthcare Plus",
      category: "Personal Care",
      price: 29,
      stock: 46,
      status: "inactive"
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || medicine.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || medicine.category.toLowerCase() === selectedCategory;
    
    let matchesPrice = true;
    if (selectedPriceRange !== 'all') {
      switch (selectedPriceRange) {
        case 'under100':
          matchesPrice = medicine.price < 100;
          break;
        case '100-500':
          matchesPrice = medicine.price >= 100 && medicine.price <= 500;
          break;
        case '500-1000':
          matchesPrice = medicine.price > 500 && medicine.price <= 1000;
          break;
        case 'over1000':
          matchesPrice = medicine.price > 1000;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="flex-1 bg-gray-100 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Medicine List</h1>
            <p className="text-sm text-gray-600">View and manage all medicines from sellers</p>
          </div>

          {/* Updated Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines or sellers..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                <FiDownload />
                Export
              </button>
            </div>
          </div>

          {/* Medicines Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{medicine.seller}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{medicine.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">₱{medicine.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{medicine.stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        medicine.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {medicine.status}
                      </span>
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

export default MedicineList;
