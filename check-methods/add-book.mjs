import axios from 'axios';

const addBook = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/books',
      {
        title: '123aaaaa',
        author: 'DTox',
        publicationDate: '2001-04-05',
        genres: ['Fiction', 'Adventure'],
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
    console.error('Error adding book:', error.message);
  }
};

addBook();
