import React from 'react';
import Button from 'react-bootstrap/Button';

class DeleteButton extends React.Component {

  render() {
    return (
      <>
        <Button variant="primary" onClick={() => this.props.deleteBook(this.props.book)}>Delete</Button>
      </>
    )
  }
}

export default DeleteButton;