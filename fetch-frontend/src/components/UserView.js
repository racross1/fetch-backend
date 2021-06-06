import React from 'react' 
 

class UserView extends React.Component{
    componentDidMount(){
        // fetch('http://localhost:3000/users')
        // .then(resp => resp.json())
        // .then(user => console.log(user))
    
    }


    render(){
        return (
            <div id='half-containers'>
            {this.props.user.username}
            <div class='row'>
                    <div class='column'>stuff</div>
                    <div class='column'>other stuff</div>
                    <div class='column'>more stuff</div>
                </div>
            </div>
        )
    }
}

export default UserView