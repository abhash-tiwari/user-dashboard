export const validateUserForm = (userData) => {
    const errors = {};
  
    if (!userData.name || userData.name.trim() === '') {
      errors.name = 'Name is required';
    }
  
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Valid email is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };