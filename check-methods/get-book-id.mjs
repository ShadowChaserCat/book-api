import axios from 'axios';

const getBookById = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/books/1');
    const book = response.data;

    console.log(`Book ID: ${book.id}`);
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`Genres:`);
    book.genres.forEach((genre) => {
      console.log(`- ${genre.name}`);
    });
    console.log('---------------------------');
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
};

getBookById();
