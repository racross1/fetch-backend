import React from 'react' 
import Table from 'react-bootstrap/Table' 


class AdminView extends React.Component{
    payerBalsToIter = () => {
        let payerBals = this.props.payerBals
        let iter = Object.entries(payerBals);
       return iter
    

    }

    render(){
        // console.log(this.props.payerBals)
       
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
                                {(this.payerBalsToIter()).map(p => {
                                    return (<tr key={p[0]}>
                                        <td>{p[0]}</td>
                                        <td>{p[1]}</td>
                                        </tr>)
                                })}
                            </tbody>
                            </Table>
                    
                    
                    </div>
                    <div className='column'>Earn Tranasctions Not Yet Spent
                    <ul>
                      

                    </ul>
                    
                    </div>
                    <div className='column'>Spend Transactions</div>
                </div>
            </div>
        )
    }
}

export default AdminView