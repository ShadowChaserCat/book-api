import axios from 'axios';

const updateBook = async () => {
  try {
    const response = await axios.put(
      'http://localhost:5000/api/books/2',
      {
        author: 'DTox123',
        genres: ['Fiction 1', 'Adventure Test'],
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZDEyMzVkQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGUiOjEsImlhdCI6MTcxOTkzNDk4OSwiZXhwIjoxNzIwMDIxMzg5fQ.29AOL6oE1JGK8U1pIV4DeYvOiOcnBgAtZn73h1FTCp8',
        },
      },
    );
    console.log('End', response.data);
  } catch (error) {
    console.error('Error book updating:', error.message);
  }
};

updateBook();
