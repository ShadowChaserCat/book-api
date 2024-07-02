import axios from 'axios';

const updateUserRole = async () => {
  const userId = 2;
  const newRole = 0b100;

  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${userId}/role`,
      { role: newRole },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZDEyMzVkQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOjQsImlhdCI6MTcxOTk0NzEzNCwiZXhwIjoxNzIwMDMzNTM0fQ.rRRGVITCFzh_3pQM7mCgk8fskWNnBHYoFghjqu-EOoA',
        },
      },
    );
    console.log('Updated user role, new token:', response.data);
  } catch (error) {
    console.error('Error updating user role:', error.message);
  }
};

updateUserRole();
