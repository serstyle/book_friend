import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Icon, Navbar, NavItem } from 'react-materialize';

import SigninModal from '../Signin/SigninModal'
import RegisterModal from '../Register/RegisterModal'
import Search from '../Search/Search'

import {resetBookList, logout, close_modal} from '../../actions'

class TopNavbar extends React.Component{
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
			<div>
				{this.props.isLoading?
					<Navbar className="black"></Navbar>
				:
					this.props.isAuthenticate? 
						<Navbar className="black"  alignLinks="right" brand={<Link to='/' className="brand-logo">Book Friends</Link>}>	
							<NavItem><Search /></NavItem>
								<NavItem>
									<Link to='/'><button className='btn-flat nav-button-item'>Home</button></Link>  
								</NavItem>
								<NavItem>
									<Link to='/profile'><button className='btn-flat nav-button-item'>Profile</button></Link> 
								</NavItem>
								<NavItem>
									<Link to='/settings'><button className='btn-flat nav-button-item'><Icon>settings</Icon></button></Link>				
								</NavItem>
								<NavItem>
									<Link to='/' onClick={this.signout}>
										<button className='btn-flat nav-button-item'>Signout</button>
									</Link>
								</NavItem>
						</Navbar>
					:
						<Navbar className="black"  alignLinks="right" brand={<Link to='/' className="brand-logo">Book Friends</Link>}>
							<NavItem>
								<SigninModal buttonSigninStyle={'btn-flat nav-button-item'} emailId={'nav_signin_email_id'} passwordId={'nav_signin_password_id'}/>
							</NavItem>
							<NavItem>
								<RegisterModal buttonRegisterStyle={'btn-flat nav-button-item'} emailId={'nav_register_email_id'} passwordId={'nav_register_password_id'} nameId={'nav_register_name_id'}/>
							</NavItem>
						</Navbar>
				}
			</div>
		)
	}
}

const mapStateToProps= (state) =>{
	return{
		isAuthenticate: state.Authentication.isAuthenticate,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopNavbar))



// {this.props.route === '/profile'?
// <Link to='/' onClick={this.props.resetBookList}>Home</Link>  
// : 
// <Link to='/profile'>Profile</Link> 
// }
