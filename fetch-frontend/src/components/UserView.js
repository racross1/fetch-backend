import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

 
const pointValues = [
    50,
    100,
    200, 
    300, 
    400, 
    500, 
    600, 
    700,
    800,
    900,
    1000,
    10000
]

class UserView extends React.Component{
    state = {
        payerId: '',
        amount: '',
        spendAmount:''
    }
    

    handlePayerChange = (e) => {
        this.setState({
            payerId: e.target.value
        })

    }

    handleEarnAmountChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    handleEarnSubmit = (e) => {
        e.preventDefault()
        if(this.state.payerId === '' || this.state.amount === ''){
            alert('When earning points, no blank fields!')
           
        } else {
            this.props.handleEarn(this.state.payerId, this.state.amount)
        }

    //    this.resetDropdown()

    }


    handleSpendAmountChange = (e) => {
        this.setState({
            spendAmount: e.target.value
        })
    }

    handleSpendSubmit = (e) => {
        e.preventDefault()
        if(this.state.spendAmount === ''){
            alert('Must choose an amount to spend!')
           
        } else {
            this.props.handleSpend(this.state.spendAmount)
        }

    //    this.resetDropdown()

    }
  

    render(){
        return (
        
            <div id='half-containers'>
            User View
            <br></br> <br></br>
            Welcome {this.props.user.username}!
            <br></br> <br></br>
            <div className='row'>
                    <div className='column'>Earn Points
                        <Form id='earn-points' onSubmit={(e) => this.handleEarnSubmit(e)}>
                            <Form.Group controlId="earn-points">
                          
                            <select onChange={(e) => this.handlePayerChange(e)}>
                          
                            <option  disabled selected>Select Partner</option>
                                {this.props.payers.map(p => {
                                    return <option value={`${p.id}`}>{p.name}</option>
                                    })
                                }
                            </select>
                            <select onChange={(e) => this.handleEarnAmountChange(e)}>
                            <option  disabled selected>Select Amount</option>
                                {pointValues.map(pv => {
                                    return <option value={`${pv}`}>{pv}</option>
                                    })
                                }
                            </select>
                </Form.Group>
                <Button type="submit">Earn!</Button><br></br>
                </Form>
                    
                    </div>
                    <div className='column'><strong>Your Current Point Balance:</strong> <br></br>{this.props.user.pts_balance}</div>
                    <div className='column'>Spend Points
                    <Form id='spend-points' onSubmit={(e) => this.handleSpendSubmit(e)}>
                            <Form.Group controlId="earn-points">
                            <select onChange={(e) => this.handleSpendAmountChange(e)}>
                            <option  disabled selected>Select Amount</option>
                                {pointValues.map(pv => {
                                    return <option value={`${pv}`}>{pv}</option>
                                    })
                                }
                            </select>
                </Form.Group>
                <Button type="submit">Spend!</Button><br></br>
                </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserView


