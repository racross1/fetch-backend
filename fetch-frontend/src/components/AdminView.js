import React from 'react' 
import Table from 'react-bootstrap/Table' 


class AdminView extends React.Component{

    render(){
        console.log(this.props.payers)
        return (
            <div id='half-containers'>
                Admin View
                <br></br> <br></br>
                <div className='row'>
                    <div className='column'>
                        Payer Balances
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Payer</th>
                                <th>Point Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.payers.map(p => {
                                    return (<tr>
                                        <td>{p.name}</td>
                                        <td>{p.pts_balance}</td>
                                        </tr>)
                                })}
                            </tbody>
                            </Table>
                    
                    
                    </div>
                    <div className='column'>Earn Tranasctions</div>
                    <div className='column'>Spend Transactions</div>
                </div>
            </div>
        )
    }
}

export default AdminView