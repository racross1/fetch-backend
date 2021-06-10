import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { makeStyles } from '@material-ui/core/styles';
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

// const useStyles = makeStyles((theme) => ({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }));

class UserView extends React.Component{
    state = {
        payerId: '',
        amount: '',
        spendAmount:'',
        earnTimestamp: '2021-06-10T10:30'
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
        // time = e.target.value
       
        let formattedTime = moment(e.target.value).format()
        this.setState({
            earnTimestamp: formattedTime
        })
    }

    handleEarnSubmit = (e) => {
        e.preventDefault()
        // console.log(moment(this.state.earnTimestamp).format())
       
        if(this.state.payerId === '' || this.state.amount === ''){
            alert('When earning points, no blank fields!')
           
        } else {
            this.props.handleEarn(this.state.payerId, this.state.amount, this.state.earnTimestamp)
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

    //    this.resetDropdown()

    }
  

    render(){
        // const classes = useStyles();
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
                        defaultValue="2021-06-10T10:30"
                        
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Form.Group>
                <Button type="submit">Earn!</Button><br></br>
                </Form>
                {/* <form noValidate>
                    <TextField
                        id="datetime-local"
                        label="Choose Timestamp"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form> */}
                    
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


