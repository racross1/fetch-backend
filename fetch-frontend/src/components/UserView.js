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
        this.props.handleEarn(this.state.payerId, this.state.amount)

    }

    render(){
        return (

            <div id='half-containers'>
            {this.props.user.username}
            <div className='row'>
                    <div className='column'>Earn Points
                        <Form id='earn-points' onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group controlId="earn-points">
                            <select onChange={(e) => this.handlePayerChange(e)}>
                        
                                {this.props.payers.map(p => {
                                    return <option value={`${p.id}`}>{p.name}</option>
                                    })
                                }
                            </select>
                            <select onChange={(e) => this.handleAmountChange(e)}>
                                
                                {pointValues.map(pv => {
                                    return <option value={`${pv}`}>{pv}</option>
                                    })
                                }
                            </select>
                </Form.Group>
                <Button type="submit">Earn!</Button><br></br>
                </Form>
                    
                    </div>
                    <div className='column'>Your Current Point Balance: {this.props.user.pts_balance}</div>
                    <div className='column'>more stuff</div>
                </div>
            </div>
        )
    }
}

export default UserView


