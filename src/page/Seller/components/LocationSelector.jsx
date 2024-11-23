import { useState, useEffect } from 'react';
import { FiPlus, FiMapPin } from 'react-icons/fi';

const LocationSelector = ({ value, onChange, existingLocations, onLocationsUpdate }) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Load saved locations from localStorage only once on mount
    const savedLocations = localStorage.getItem('storeLocations');
    const mergedLocations = savedLocations 
      ? [...new Set([...JSON.parse(savedLocations), ...existingLocations])]
      : existingLocations;
    
    setLocations(mergedLocations);
    if (onLocationsUpdate) {
      onLocationsUpdate(mergedLocations);
    }
  }, []); // Empty dependency array to run only once

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      const updatedLocations = [...new Set([...locations, newLocation.trim()])];
      setLocations(updatedLocations);
      localStorage.setItem('storeLocations', JSON.stringify(updatedLocations));
      onChange(newLocation.trim());
      if (onLocationsUpdate) {
        onLocationsUpdate(updatedLocations);
      }
      setNewLocation('');
      setShowAddNew(false);
    }
  };

  return (
    <div className="space-y-2">
      {!showAddNew ? (
        <div className="flex flex-col space-y-2">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 bg-gray-50 rounded-md border"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowAddNew(true)}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
          >
            <FiPlus className="mr-1" /> Add New Location
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter new location"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-md border"
              />
            </div>
            <button
              type="button"
              onClick={handleAddLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowAddNew(false)}
            className="text-gray-600 hover:text-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 