import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Modal, Button, Icon } from 'react-materialize';

import Signin from '../Signin/Signin'
import Register from '../Register/Register'

import {resetBookList, logout, close_modal} from '../../actions'

class Navbar extends React.Component{
	// state = {
	// 	isOpen: false,
	// 	isRegOpen:false
	// }
	// closeModal = e => {
	// 	this.setState({isOpen: false, isRegOpen:false}) 
	// }
	// closeRegModal = e => {
	// 	this.setState({isRegOpen: false, isOpen:false}) 
	// }
	//closeRegModal={this.closeRegModal}
	// open={this.state.isRegOpen}
	signout = () => {
		this.props.resetBookList()
		this.props.logout()
	}
	render(){
		return (
			<nav className="nav-wrapper teal">
				{this.props.isLoading?
				null
				:
				<div>
					<Link to='/' onClick={this.props.resetBookList} className="brand-logo">Book Friends</Link>
						{this.props.isAuthenticate? 
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								<li>
									
										{this.props.route === '/profile'?
										<Link to='/' onClick={this.props.resetBookList}>Home</Link>  
										: 
										<Link to='/profile'>Profile</Link> 
										}
									
								</li>
								<li>
								<Link to='/settings'><Icon>settings</Icon></Link>				
								</li>
								<li>
									<Link to='/' onClick={this.signout}>
										Signout
									</Link>
								</li>
							</ul>
						:
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>
								<Modal 
									id='signin' 
									header='Signin'
									modalOptions={{
										preventScrolling:false,
										onCloseStart:()=>this.props.close_modal()
									
									}}
									trigger={
										<Button>
											Sign in
										</Button>
										}
									> 
									<Signin /> 
								</Modal>
							</li>
							<li>
								<Modal 
									id='register' 
									header='Register'
									modalOptions={{
										preventScrolling:false,
										onCloseStart:()=>this.props.close_modal()
										}}
									trigger={
										<Button>
											Register
										</Button>
										} 
									>
									<Register /> 
								</Modal>
							</li>
						</ul>
					}
				</div>
				}
			</nav>
		)
	}
}

const mapStateToProps= (state) =>{
	return{
		isAuthenticate: state.Authentication.isAuthenticate,
		route: state.onRouteChange.route,
		isLoading: state.Authentication.isLoading
}
}

const mapDispatchToProps = (dispatch) =>{
	return{
		resetBookList: ()=> dispatch(resetBookList()),
		logout: ()=> dispatch(logout()),
		close_modal: ()=> dispatch(close_modal())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))

