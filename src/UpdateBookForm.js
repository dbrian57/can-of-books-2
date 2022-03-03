import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import axios from 'axios';
class UpdateBookForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.book?._id,
      title: this.props.book?.name,
      description: this.props.book?.description,
      email: this.props.book?.email
    };
  }

updateBook = async (bookToUpdate) => {
  try {
    await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`, bookToUpdate);
    
  } catch (error) {
    console.error(error);
  }
}

  handleSubmit = (event) => {
    event.preventDefault();

    let bookToUpdate = {
      title: this.state.title || this.props.book.title,
      description: this.state.description || this.props.book.description,
      status: this.state.status || this.props.book.status,
      // emailAddress: event.target.formAddress.value || this.props.book.emailAddress,
      _id: this.props.book._id,
      __v: this.props.book.__V
    }

    console.log(bookToUpdate);
    this.updateBook(bookToUpdate);
  }

  render() {
    return (
      <>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder={this.props.book.title} onChange={(event) => this.setState({title:event.target.value})} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder={this.props.book.description} onChange={(event) => this.setState({description:event.target.value})} />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder={this.props.book.status} onChange={(event) => this.setState({status:event.target.value})}/>
            </Form.Group>

            <Button type="submit">Update Books</Button>
          </Form>

        </Container>
      </>
    )
  }
}

export default UpdateBookForm;