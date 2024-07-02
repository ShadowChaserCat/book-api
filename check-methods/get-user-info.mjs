import axios from 'axios';

const getCurrentUserInfo = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/me', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZDEyMzVkQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOjEsImlhdCI6MTcxOTkzNDk4OSwiZXhwIjoxNzIwMDIxMzg5fQ.29AOL6oE1JGK8U1pIV4DeYvOiOcnBgAtZn73h1FTCp8',
      },
    });
    console.log('End', response.data);
  } catch (error) {
    console.error('Error getting info user:', error.message);
  }
};

getCurrentUserInfo();
