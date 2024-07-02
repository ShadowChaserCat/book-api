import axios from 'axios';

const getBooks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/books');
    const books = response.data;

    books.forEach((book) => {
      console.log(`Book ID: ${book.id}`);
      console.log(`Title: ${book.title}`);
      console.log(`Author: ${book.author}`);
      console.log(`Genres:`);
      book.genres.forEach((genre) => {
        console.log(`- ${genre.name}`);
      });
      console.log('---------------------------');
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
};

getBooks();
