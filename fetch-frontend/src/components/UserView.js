import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
 
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
        amount: ''
    }
    

    handlePayerChange = (e) => {
     
        this.setState({
            payerId: e.target.value
        })

    }

    handleAmountChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.payerId == '' || this.state.amount == ''){
            alert('When earning points, no blank fields!')
           
        } else {
        this.props.handleEarn(this.state.payerId, this.state.amount)
        }

       this.resetDropdown()

    }

     resetDropdown() {
        let dropDown = document.getElementById('earn-points');
        dropDown.selectedIndex = 0;
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
                        <Form id='earn-points' onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group controlId="earn-points">
                          
                            <select onChange={(e) => this.handlePayerChange(e)}>
                          
                            <option  disabled selected>Select Partner</option>
                                {this.props.payers.map(p => {
                                    return <option value={`${p.id}`}>{p.name}</option>
                                    })
                                }
                            </select>
                            <select onChange={(e) => this.handleAmountChange(e)}>
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
                    <div className='column'>Spend Points</div>
                </div>
            </div>
        )
    }
}

export default UserView


