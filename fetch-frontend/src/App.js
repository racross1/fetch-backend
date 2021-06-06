import './App.css';
import React from 'react';
import AdminView from './components/AdminView.js'
import UserView from './components/UserView.js'
import Login from './components/Login.js'

class App extends React.Component{
  state = {
    loggedIn: false,
    user: false
  }
  
  showLogin = (user, bool) => {
    this.setState({
      loggedIn: bool,
      user: user
      })
  }

  
  render() {
  return (
    <div id='main-container' className="App">
      {this.state.loggedIn === false ? <Login showLogin={this.showLogin}/> :<UserView user={this.state.user}/> } 

        {/* <UserView/>
        <AdminView/>
       */}
    </div>
  );
      }
}

export default App;
