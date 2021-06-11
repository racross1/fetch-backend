import React from 'react' 
import Table from 'react-bootstrap/Table'
import moment from 'moment'
// import 'bootstrap/dist/css/bootstrap.min.css';


class AdminView extends React.Component{
    payerBalsToIter = () => {
        let payerBals = this.props.payerBals
        let iter = Object.entries(payerBals);
        
       return iter
    }

    earnsToIter = () => {
        let earns = this.props.earns
        let iter = earns.map(e => {
            let name = this.props.payers.find(p => p.id === e.payer_id).name
            return [name, e.init_amount, e.active_amount, moment(e.earn_timestamp).format('MMMM Do YYYY, h:mm a')]
        })
       return iter
    }

    render(){
       let payerBals = this.payerBalsToIter()
       let latestSpend = this.props.latestSpend
        return (
            <div id='half-containers'>
                <br></br><br></br><br></br>
                <span className='container-half-header'>Admin Console</span>
                <br></br> <br></br>
                <div className='row'>
                    <div className='column-1'>
                    <span className='section-header'>Payer Balances</span>
                    <br></br><br></br>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th>Payer</th>
                                <th>Point Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payerBals.map(p => {
                                    return (<tr key={p[0]}>
                                        <td>{p[1][1]}</td>
                                        <td>{p[1][0]}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    
                    
                    </div>
                    <div className='column-2'>
                    <span className='section-header'>Earned Points Not Yet Spent</span>
                        <br></br><br></br>
                        <Table bordered={ true } size="sm">
                            <thead>
                                <tr>
                                <th>Payer</th>
                                <th>Total Points Earned</th>
                                <th>Points Remaining</th>
                                <th>Earn Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.earns === []? null : this.earnsToIter().map(p => {
                                    return (<tr key={p[3]}>
                                        <td>{p[0]}</td>
                                        <td>{p[1]}</td>
                                        <td>{p[2]}</td>
                                        <td>{p[3]}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className='column-3'>
                    <span className='section-header'>Latest Spend Transaction</span>
                    <br></br><br></br>
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Payer</th>
                                <th>Points</th>
                                <th>Earn Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!latestSpend ? null : this.props.latestSpend.map(s => {
                                    return (<tr key={s.timestamp}>
                                        <td>{s.payer}</td>
                                        <td>{s.points}</td>
                                        <td>{moment(s.timestamp).format('MMMM Do YYYY, h:mm a')}</td>
                                        </tr>)
                                })}
                            </tbody>
                            </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminView