import './App.css';
import React from 'react';
import Login from './components/Login.js'
import UserView from './components/UserView.js'
import AdminView from './components/AdminView.js'

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


class App extends React.Component{
  state = {
    loggedIn: false,
    user: false, 
    earns: [],
    spends: [],
    payers: [],
    payerBals: [],
    latestSpend: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/payers')
    .then(resp => resp.json())
    .then(payers => this.setState({payers: [...payers]}))
  }
  
  getPayerBals = (userId) => {
    fetch(`http://localhost:3000/users/${userId}/payerbals`)
    .then(resp => resp.json())
    .then(payerBals => this.setState({payerBals: payerBals}))
  }

  getEarns = (userId) => {
    fetch(`http://localhost:3000/users/${userId}/earns`)
    .then(resp => resp.json())
    .then(earnTransactions =>{
      this.setState({earns: earnTransactions})
      }
    )
  }


  handleLogin = (user, bool) => {
    this.setState({
      loggedIn: bool,
      user: user
      })
      this.getEarns(user.id)
      this.getPayerBals(user.id)
  }

  handleEarn = (payer, amount, earnTimestamp) => {
    let newEarn = {"user_id": parseInt(this.state.user.id), "payer_id": parseInt(payer), "init_amount": parseInt(amount), "earn_timestamp": earnTimestamp}
       
        fetch('http://localhost:3000/transactions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newEarn),
        })
        .then(resp => resp.json())
        .then(data => {
         
          let newUserPtsBalance = data.updated_user_pts
          let updatedUser = {...this.state.user, pts_balance: newUserPtsBalance}
          
          let payerId = data.payer.id
          let updatedPayerBals = {...this.state.payerBals}
          updatedPayerBals[payerId]= data.updated_payer_pts
          
          let updatedEarns = [...this.state.earns]
          updatedEarns.push(data.earn_transaction)
          updatedEarns = updatedEarns.sort((a,b) => a.earn_timestamp > b.earn_timestamp ? 1 : -1)
          
          this.setState({
            user: updatedUser,
            payerBals: updatedPayerBals,
            earns: updatedEarns
          })
        })
      
  }

  handleSpend = (amount) => {
    let userId = this.state.user.id
    let newSpend =  {"user_id": parseInt(userId), "amount": parseInt(amount)}

    fetch('http://localhost:3000/spends', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newSpend),
      })
      .then(resp => resp.json())
      .then(data => {
        let newUserPtsBalance = data.updated_user_pts
        let updatedUser = {...this.state.user, pts_balance: newUserPtsBalance}
        let updatedPayerBals = data.payer_bals
        let spend = data.spend_output
      
        this.setState({
          user: updatedUser,
          payerBals: updatedPayerBals,
          latestSpend: spend
        })
        this.getEarns(this.state.user.id)
      })
  }

  render() {
    return (
      <div id='main-container' className="App">
        {!this.state.loggedIn ? (
          <Login handleLogin={this.handleLogin}/>
          ) : (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {<UserView user={this.state.user} payers={this.state.payers} handleEarn={this.handleEarn} handleSpend={this.handleSpend}/> 
            }
            <AdminView payers={this.state.payers} earns={this.state.earns} payerBals={this.state.payerBals} latestSpend={this.state.latestSpend}/>
          </MuiPickersUtilsProvider>
          )
        }   
      </div>
    );
  }
}

export default App;
