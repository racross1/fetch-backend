import React from 'react' 
 

class AdminView extends React.Component{

    render(){
        return (
            <div id='half-containers'>
                Admin view
                <div className='row'>
                    <div className='column'>stuff</div>
                    <div className='column'>other stuff</div>
                    <div className='column'>more stuff</div>
                </div>
            </div>
        )
    }
}

export default AdminView