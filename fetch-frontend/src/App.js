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
    this.getPayers()
  }
  
  getPayers = () => {
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
    let newEarn = {"user_id": parseInt(this.state.user.id), "payer_id": parseInt(payer), "init_amount": parseInt(amount)}
       
        fetch('http://localhost:3000/transactions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newEarn),
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          let newUserPtsBalance = data.updated_user_pts
          let updatedUser = {...this.state.user, pts_balance: newUserPtsBalance}

          this.setState({
            user: updatedUser,
            earns: [...this.state.earns, data.spend_transaction]
          })
        })
        this.getPayers()

  }

  
  render() {
  return (
    <div id='main-container' className="App">
      {!this.state.loggedIn ? (
        <Login handleLogin={this.handleLogin}/>
        ) : (
        <>
        {<UserView user={this.state.user} payers={this.state.payers} handleEarn={this.handleEarn}/> 
        }
        <AdminView payers={this.state.payers}/>
        </>
        )
      }
         

        
    </div>
  );
      }
}

export default App;
