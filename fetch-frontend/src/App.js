import './App.css';
import React from 'react';
import Login from './components/Login.js'
import UserView from './components/UserView.js'
import AdminView from './components/AdminView.js'




class App extends React.Component{
  state = {
    loggedIn: false,
    user: false, 
    earns: [],
    spends: [],
    payers: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/payers')
    .then(resp => resp.json())
    .then(payers => this.setState({payers: [...payers]}))
}
  
  handleLogin = (user, bool) => {
    this.setState({
      loggedIn: bool,
      user: user
      })
  }

  handleEarn = (payer, amount) => {
    console.log(payer, amount)
    //next do feth to backend to process new spend

  }

  
  render() {
  return (
    <div id='main-container' className="App">
      {this.state.loggedIn ? (
        <>
        {<UserView user={this.state.user} payers={this.state.payers} handleEarn={this.handleEarn}/> 
        }
        <AdminView/>
        </>
        ):(
        <Login handleLogin={this.handleLogin}/>
        ) 
      }
         

        
    </div>
  );
      }
}

export default App;
