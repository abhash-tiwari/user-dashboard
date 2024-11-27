import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

// Local storage for users to simulate persistent data
let localUsers = [];

const fetchUsers = async (page, itemsPerPage) => {
  try {
    if (localUsers.length === 0) {
      const response = await axios.get(BASE_URL);
      localUsers = response.data;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = localUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalItems: localUsers.length,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const addUser = async (userData) => {
  try {
    // Simulate adding a user with a new ID
    const newUser = {
      ...userData,
      id: localUsers.length > 0 ? Math.max(...localUsers.map(u => u.id)) + 1 : 1
    };
    
    // Add to local users array
    localUsers.push(newUser);
    
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    // Find the index of the user to update
    const userIndex = localUsers.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
      // Update the user in the local users array
      localUsers[userIndex] = { ...localUsers[userIndex], ...userData };
      return localUsers[userIndex];
    }
    
    throw new Error('User not found');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    // Remove the user from local users array
    const deletedUserIndex = localUsers.findIndex(user => user.id === userId);
    
    if (deletedUserIndex !== -1) {
      // Remove the user
      localUsers.splice(deletedUserIndex, 1);
      
      // Reorganize remaining users' IDs
      localUsers = localUsers.map((user, index) => ({
        ...user,
        id: index + 1
      }));
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export { fetchUsers, addUser, updateUser, deleteUser };