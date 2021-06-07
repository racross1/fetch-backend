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
    .then(this.getEarns())
    
  }
  
  // /users/:id/payerbals
  getPayerBals = () => {
    let userId = this.state.user.id
    //do this fetch to user model
    fetch(`http://localhost:3000/users/${userId}/earns`)
    .then(resp => resp.json())
    .then(payerBals => console.log(payerBals))
  }

  getEarns = (userId) => {
    fetch(`http://localhost:3000/users/${userId}/earns`)
    .then(resp => resp.json())
    .then(earnTransactions => console.log(earnTransactions))
  }

  handleLogin = (user, bool) => {
    this.setState({
      loggedIn: bool,
      user: user
      })

      this.getEarns(user.id)

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
            earns: [...this.state.earns, data.earn_transaction]
          })
        })
        //still have get payers call because a new payer may have been added with earn
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
        <AdminView payers={this.state.payers} earns={this.state.earns}/>
        </>
        )
      }
         

        
    </div>
  );
      }
}

export default App;
