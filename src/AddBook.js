import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;
const API_URL = `${SERVER}/books`;


class AddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addBook: 0,
      newBook: {}   
    }
  }

  formHandler = (event) => {
    event.preventDefault();

    this.setState({
      addBook: 1
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let thisBook = {
      title: event.target.formTitle.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.value,
      emailAddress: event.target.formAddress.value
    };
    this.setState({ newBook: thisBook
    })
    try {
      await axios.post(API_URL, this.state.newBook);
    } catch (error) {
      console.error("Book could not be posted");
    }

  }

  render() {

    return (
      <>
        <Button variant="primary" onClick={this.formHandler} >Add Book</Button>{' '}

        {this.state.addBook > 0 ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="name" placeholder="Enter book title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="name" placeholder="Enter book description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="name" placeholder="Is the book out of print or in print?" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="name" placeholder="Your email address" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (<p></p>

        )}
      </>
    )
  }

}

export default AddBook;