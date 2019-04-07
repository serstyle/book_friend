import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-materialize';

import Signin from '../Signin/Signin'
import Register from '../Register/Register'

import {resetBookList, authSignout} from '../../actions'

class Navbar extends React.Component{
	state = {
		isOpen: false,
		isRegOpen:false
	}
	closeModal = e => {
		this.setState({isOpen: false, isRegOpen:false}) 
	}
	openModal = e => {
		this.setState({isOpen: true}) 
	}
	closeRegModal = e => {
		this.setState({isRegOpen: false, isOpen:false}) 
	}
	openRegModal = e => {
		this.setState({isRegOpen: true}) 
	}
	
	render(){
		return (
			<nav>
				<div className="nav-wrapper teal">
					<Link to='/' onClick={this.props.resetBookList} className="brand-logo">Book Friends</Link>
					{this.props.isAuthenticate? 
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>
								<Button className='m5'>
									{this.props.route === '/profile'?
									<Link to='/'>Home</Link>  
									: 
									<Link to='/profile'>Profile</Link> 
									}
								</Button>
							</li>
							<li>
								<Button onClick={this.props.authSignout}>
									Signout
								</Button>
							</li>
						</ul>
					:
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>
								<Button 
									onClick={this.openModal} 
									href='#signin'
									className="modal-trigger">
									Sign in
								</Button>

								<Modal 
									id='signin' 
									open={this.state.isOpen} 
									header='Signin'> 
									<Signin closeModal={this.closeModal} /> 
								</Modal>
							</li>
								<li>
									<Button 
										onClick={this.openRegModal} 
										href='#register' 
										className="modal-trigger">
										Register
									</Button>
									<Modal 
										header='Register' 
										open={this.state.isRegOpen} 
										id="register"> 
										<Register closeRegModal={this.closeRegModal} /> 
									</Modal>
								</li>
						</ul>
					}
				</div>
			</nav>
		)
	}
}

const mapStateToProps= (state) =>{
	return{
		isAuthenticate: state.Authentication.isAuthenticate,
		route: state.onRouteChange.route
}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		resetBookList: ()=> dispatch(resetBookList()),
		authSignout: ()=> dispatch(authSignout())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))

