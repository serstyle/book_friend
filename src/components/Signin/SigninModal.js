import React from 'react';
import { connect } from 'react-redux'
import { Modal } from 'react-materialize';

import Signin from './Signin'
import {close_modal} from '../../actions'


class SigninModal extends React.Component{
    render(){
        return(
        <Modal 
            id='signin' 
            header='Signin'
            modalOptions={{
                preventScrolling:false,
                onCloseStart:()=>this.props.close_modal()

            }}
            trigger={
                <button className={this.props.buttonSigninStyle}>
                    Sign in
                </button>
                }
            > 
            <Signin emailId={this.props.emailId} passwordId={this.props.passwordId}/> 
        </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        close_modal: ()=> dispatch(close_modal())
    }
}

export default connect(null, mapDispatchToProps)(SigninModal);