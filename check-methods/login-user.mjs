import axios from 'axios';

const loginUser = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: 'usd1235d@examplea.123com',
      password: 'password12asd35',
      username: 'kedasd2312123aasdsdas',
    });
    console.log('User login successful, user token:', response.data);
  } catch (error) {
    console.error('Error logining user:', error.message);
  }
};

loginUser();
