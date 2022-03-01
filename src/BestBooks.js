import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

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
                  // src={bookImg}
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h1>{book.title}</h1>
                  <h3>{book.description}</h3>
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
