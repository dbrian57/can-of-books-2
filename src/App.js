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
    console.log(this.state.user)
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} loginHandler={this.loginHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              
              <BestBooks user={this.state.user} />
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
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;


