import React from 'react'
import SigninModal from '../Signin/SigninModal'
import RegisterModal from '../Register/RegisterModal'


class HomeVisitor extends React.Component {
    render(){
        return(
            <div className='container'>
                <h3 className='center'>Welcome</h3>
                <h5 className='center'> Signin or Register to start using the BookFriends App</h5>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop:'3rem'
                    }}>
                    <SigninModal buttonSigninStyle={'btn'} emailId={'button_signin_email_id'} passwordId={'button_signin_password_id'}/>
                    <RegisterModal buttonRegisterStyle={'btn'} emailId={'button_register_email_id'} passwordId={'button_register_password_id'} nameId={'button_register_name_id'}/>
                </div>
            </div>
        )
    }
}

export default HomeVisitor;