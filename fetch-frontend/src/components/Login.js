import React from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Login extends React.Component{
    state = {
        username: ''
    }

    handleChangeUsername = (e) => {
        
        this.setState({
            username: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
       
        let newUsername = this.state.username
       
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({'username': newUsername}),
        })
        .then(resp => resp.json())
        .then(registeredUser => this.props.handleLogin(registeredUser, true))
    }

    render(){
        return (
            <div id='login'>
                <Form id='signup-form' onSubmit={(e) => this.handleSubmit(e)}>
                <h5>Enter Username</h5>
                
                <Form.Group controlId="signup-form-username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control size='sm' onChange={(e) => this.handleChangeUsername(e)} type="text" className="form-control" placeholder="Enter Username" />
                </Form.Group>
                <Button type="submit">Sign In</Button><br></br>
                </Form>
               
            </div>
        )
    }
}

export default Login