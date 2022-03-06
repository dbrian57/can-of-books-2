import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';
import AddBook from './AddBook'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

// import UpdateBookForm from './UpdateBookForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }


  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} loginHandler={this.loginHandler} />

          {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {/* {this.props.auth0.isAuthenticated? <Profile /> : <h2>Please Log In</h2>} */}
          {this.props.auth0.isAuthenticated? <Profile /> : <p></p>}
          <hr></hr>
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthenticated? <BestBooks user={this.state.user} /> : <h2>Please log in to see your books</h2>}
              
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path='/profile'>
              { 
                this.state.user &&
                <Profile user={this.state.user} />
              }
            </Route>
          </Switch>
          <AddBook />
          {/* <UpdateBookForm  /> */}
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);

