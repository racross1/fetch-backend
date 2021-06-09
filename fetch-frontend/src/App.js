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
    payers: [],
    payerBals: [],
    latestSpend: {}
  }

  componentDidMount(){
    fetch('http://localhost:3000/payers')
    .then(resp => resp.json())
    // .then(payers => console.log(payers))
    .then(payers => this.setState({payers: [...payers]}))
  }
  
  // /users/:id/payerbals
  getPayerBals = (userId) => {
    
    fetch(`http://localhost:3000/users/${userId}/payerbals`)
    .then(resp => resp.json())
    .then(payerBals => this.setState({payerBals: payerBals}))
  }

  getEarns = (userId) => {
    
    fetch(`http://localhost:3000/users/${userId}/earns`)
    .then(resp => resp.json())
    .then(earnTransactions => console.log(earnTransactions))
      // this.setState({earns: [...earnTransactions]}))
  }

  // getSpend = (userId) => {
    
  //   fetch(`http://localhost:3000/users/${userId}/newspend`)
  //   .then(resp => resp.json())
  //   .then(spendTransactions => console.log(spendTransactions))
  //     // this.setState({earns: [...earnTransactions]}))
  // }


  handleLogin = (user, bool) => {
    this.setState({
      loggedIn: bool,
      user: user
      })

      this.getEarns(user.id)
      this.getPayerBals(user.id)
    

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
          
          let newUserPtsBalance = data.updated_user_pts
          let updatedUser = {...this.state.user, pts_balance: newUserPtsBalance}
          let payerName = data.payer_name
          let updatedPayerBals = {...this.state.payerBals}
          updatedPayerBals[payerName] = data.updated_payer_pts
          
          this.setState({
            user: updatedUser,
            payerBals: updatedPayerBals
          

          })
        })

        //still have get payers call because a new payer may have been added with earn
        // this.getPayerBals(this.state.user.id)
        this.getEarns(this.state.user.id)
        this.getPayerBals(this.state.user.id)
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
        console.log(data)
        let newUserPtsBalance = data.updated_user_pts
        let updatedUser = {...this.state.user, pts_balance: newUserPtsBalance}
        let updatedPayerBals = data.payer_bals
        // let spend = data.spend_output[0]
      
        this.setState({
          user: updatedUser,
          payerBals: updatedPayerBals,
          // latestSpend: spend


        })

      
      })

    
  }

  
  render() {
  return (
    <div id='main-container' className="App">
      {!this.state.loggedIn ? (
        <Login handleLogin={this.handleLogin}/>
        ) : (
        <>
        {<UserView user={this.state.user} payers={this.state.payers} handleEarn={this.handleEarn} handleSpend={this.handleSpend}/> 
        }
        <AdminView payers={this.state.payers} earns={this.state.earns} payerBals={this.state.payerBals} spend={this.state.spend}/>
        </>
        )
      }
         

        
    </div>
  );
      }
}

export default App;
