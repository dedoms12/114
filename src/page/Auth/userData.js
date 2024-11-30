const users = [
  {
    id: 0,
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin',
    role: 'admin'
  },
  {
    id: 1,
    name: 'Seller',
    email: 'seller@gmail.com',
    password: 'sellerrani',
    role: 'seller'
  },
  {
    id: 2,
    name: 'Buyer',
    email: 'buyer@gmail.com',
    password: 'buyerrani',
    role: 'buyer'
  },
];

// Admin registration key
const ADMIN_KEY = '123456'; // 6-character unique key

export const addUser = (userData) => {
  if (userData.role === 'admin' && userData.adminKey !== ADMIN_KEY) {
    throw new Error('Invalid admin key');
  }

  // Remove adminKey and confirmPassword before storing
  const { adminKey, confirmPassword, ...userDataToStore } = userData;

  const newUser = {
    id: users.length + 1,
    ...userDataToStore
  };
  users.push(newUser);
  return newUser;
};

export const verifyAdminKey = (key) => {
  return key === ADMIN_KEY;
};

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const getAllUsers = () => users;

export default users;
