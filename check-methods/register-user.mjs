import axios from 'axios';

const registerUser = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/users/register',
      {
        email: 'usd@example.com',
        password: '123',
        username: 'asdc',
      },
    );
    console.log('User registration successful, user token:', response.data);
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
};

registerUser();
