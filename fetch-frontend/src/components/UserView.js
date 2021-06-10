import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

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

const defaultTime = '2021-06-10T09:00'

class UserView extends React.Component{
    state = {
        payerId: '',
        amount: '',
        spendAmount:'',
        earnTimestamp: defaultTime
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

    handleEarnDateChange = (e) => {
        this.setState({
            earnTimestamp: e.target.value
        })
    }

    handleEarnSubmit = (e) => {
        e.preventDefault()
        let formattedTime = moment(this.state.earnTimestamp).format()
        if(this.state.payerId === '' || this.state.amount === '' ){
            alert('When earning points, no blank fields! Must choose date and time as well')
        } else {
            this.props.handleEarn(this.state.payerId, this.state.amount, formattedTime)
        }
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

    }
  
    render(){
        return (
            <div id='half-containers'>
            User Console
            <br></br> <br></br>
            Welcome {this.props.user.username}!
            <br></br> <br></br>
            <div className='row'>
                    <div className='column-4'><span className='section-header'>Earn Points</span>
                        <Form id='earn-points' onSubmit={(e) => this.handleEarnSubmit(e)}>
                            <Form.Group controlId="handle-payer">
                                <select onChange={(e) => this.handlePayerChange(e)}>
                                <option  disabled selected>Select Partner</option>
                                    {this.props.payers.map(p => {
                                        return <option key={`${p.id}`} value={`${p.id}`}>{p.name}</option>
                                        })
                                    }
                                </select>
                                <select onChange={(e) => this.handleEarnAmountChange(e)}>
                                <option  disabled selected>Select Amount</option>
                                    {pointValues.map(pv => {
                                        return <option key={`${pv}`} value={`${pv}`}>{pv}</option>
                                        })
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <TextField
                                    onChange={(e) => this.handleEarnDateChange(e)}
                                    id="datetime-local"
                                    label="Choose Timestamp"
                                    type="datetime-local"
                                    defaultValue={`${defaultTime}`}
                                    
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </Form.Group>
                            <Button type="submit">Earn!</Button><br></br>
                        </Form>
                    </div>
                    <div className='column-4'><span className='section-header'>Your Current Point Balance:</span><br></br>{this.props.user.pts_balance}</div>
                    <div className='column-4'><span className='section-header'>Spend Points</span>
                        <Form id='spend-points' onSubmit={(e) => this.handleSpendSubmit(e)}>
                            <Form.Group controlId="earn-points">
                                <select onChange={(e) => this.handleSpendAmountChange(e)}>
                                <option  disabled selected>Select Amount</option>
                                    {pointValues.map(pv => {
                                        return <option key={`${pv}`} value={`${pv}`}>{pv}</option>
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


