import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import DeleteButton from './DeleteButton';
import UpdateBookForm from './UpdateBookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    this.setState({
      books: bookData.data,
    })

  }

  componentDidMount() {
    this.getBooks();
  }

  deleteBook = async (book) => {
    let id = book._id
    console.log(book);
    let newBooks = this.state.books;
    newBooks = this.state.books.filter(item => (item._id !== id))
    this.setState({
      books: newBooks
    })

    try {
      const config = {
        params: {email: this.props.user.email},
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/books/${id}`
      }
      axios(config)
    } catch (error) {
      console.error(error);
    }
  }

  render() {



    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length > 0 ? (
          <Carousel>
            {this.state.books.map((book, idx) => (
              <Carousel.Item className="h-100"
                key={idx}>
                <img
                  className="d-block w-100 h-50"
                  src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80"
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h1>{book.title}</h1>
                  <h3>{book.description}</h3>
                  <DeleteButton book={book} deleteBook={this.deleteBook} />
                  <UpdateBookForm book={book}/>
                </Carousel.Caption>
              </Carousel.Item>))}
          </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}
        

      </>
    )
  }
}

export default BestBooks;