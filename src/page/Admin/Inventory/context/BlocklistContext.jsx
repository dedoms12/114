import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const BlocklistContext = createContext();

export const BlocklistProvider = ({ children }) => {
  const [blockedItems, setBlockedItems] = useState({
    medicines: [],
    stores: []
  });
  const [pharmacies, setPharmacies] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const addBlockedMedicine = async (medicine) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        medicines: [...prev.medicines, { ...medicine, id: medicine.id || Date.now() }]
      }));
      
      setMedicines(prev => 
        prev.map(med => 
          med.id === medicine.id 
            ? { ...med, status: 'blocked' }
            : med
        )
      );
      return true;
    } catch (error) {
      console.error('Error adding blocked medicine:', error);
      return false;
    }
  };

  const updateBlockedMedicine = async (medicineId, updates) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        medicines: prev.medicines.map(med => 
          med.id === medicineId ? { ...med, ...updates } : med
        )
      }));
      toast.success('Medicine block details updated');
      return true;
    } catch (error) {
      toast.error('Failed to update medicine');
      return false;
    }
  };

  const deleteBlockedMedicine = async (medicineId) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        medicines: prev.medicines.filter(med => med.id !== medicineId)
      }));
      toast.success('Medicine removed from blocklist');
      return true;
    } catch (error) {
      toast.error('Failed to delete medicine');
      return false;
    }
  };

  const removeBlockedMedicine = async (medicineId) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        medicines: prev.medicines.filter(med => med.id !== medicineId)
      }));
      
      setMedicines(prev => 
        prev.map(med => 
          med.id === medicineId 
            ? { ...med, status: 'active', restrictions: [] }
            : med
        )
      );

      const medicineName = medicines.find(med => med.id === medicineId)?.name || 'Medicine';
      toast.success(`${medicineName} has been unblocked`);
      return true;
    } catch (error) {
      console.error('Error unblocking medicine:', error);
      toast.error('Failed to unblock medicine');
      return false;
    }
  };

  const addBlockedStore = async (store) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        stores: [...prev.stores, { ...store, id: store.id || Date.now() }]
      }));
      setPharmacies(prev => 
        prev.map(pharmacy => 
          pharmacy.id === store.id 
            ? { ...pharmacy, status: 'blocked' }
            : pharmacy
        )
      );
      toast.success(`${store.name} has been blocked`);
      return true;
    } catch (error) {
      console.error('Error blocking store:', error);
      toast.error('Failed to block store');
      return false;
    }
  };

  const removeBlockedStore = async (storeId) => {
    try {
      setBlockedItems(prev => ({
        ...prev,
        stores: prev.stores.filter(store => store.id !== storeId)
      }));
      setPharmacies(prev => 
        prev.map(pharmacy => 
          pharmacy.id === storeId 
            ? { ...pharmacy, status: 'active' }
            : pharmacy
        )
      );
      toast.success('Store has been unblocked');
      return true;
    } catch (error) {
      toast.error('Failed to unblock store');
      return false;
    }
  };

  return (
    <BlocklistContext.Provider value={{ 
      blockedItems, 
      medicines,
      setMedicines,
      pharmacies,
      setPharmacies,
      addBlockedMedicine,
      updateBlockedMedicine,
      deleteBlockedMedicine,
      removeBlockedMedicine,
      addBlockedStore,
      removeBlockedStore
    }}>
      {children}
    </BlocklistContext.Provider>
  );
};

export const useBlocklist = () => {
  const context = useContext(BlocklistContext);
  if (!context) {
    throw new Error('useBlocklist must be used within a BlocklistProvider');
  }
  return context;
};