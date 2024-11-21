const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@pillpoint.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Tester3',
    email: 'test3@pillpoint.com',
    password: 'test333',
    role: 'admin'
  },
  {
    id: 3,
    name: 'Tester1',
    email: 'test1@pillpoint.com',
    password: 'test111',
    role: 'buyer'
  },
  {
    id: 4,
    name: 'Tester2',
    email: 'test2@pillpoint.com',
    password: 'test222',
    role: 'seller'
  }

];

// Admin registration key
const ADMIN_KEY = 'PP2024'; // 6-character unique key

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
