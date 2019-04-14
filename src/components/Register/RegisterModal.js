import React from 'react';
import { connect } from 'react-redux'
import { Modal } from 'react-materialize';

import Register from './Register'
import {close_modal} from '../../actions'


class RegisterModal extends React.Component{
    render(){
        return(
            <Modal 
            id='register' 
            header='Register'
            modalOptions={{
                preventScrolling:false,
                onCloseStart:()=>this.props.close_modal()
                }}
            trigger={
                <button className='btn-flat nav-button-item'>
                    Register
                </button>
                } 
            >
            <Register /> 
        </Modal>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        close_modal: ()=> dispatch(close_modal())
    }
}

export default connect(null, mapDispatchToProps)(RegisterModal);