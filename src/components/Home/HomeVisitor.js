import React from 'react'
import SigninModal from '../Signin/SigninModal'
import RegisterModal from '../Register/RegisterModal'

import {Button} from 'react-materialize'

class HomeVisitor extends React.Component {
    render(){
        return(
            <div className='container'>
                <h3 className='center'>Welcome</h3>
                <h5 className='center'> Signin or Register to start using the BookFriends App</h5>
                <div className='center-align'>
                    <Button><SigninModal /></Button>
                    <Button><RegisterModal /></Button>
                </div>
            </div>
        )
    }
}

export default HomeVisitor;