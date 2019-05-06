import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Icon, Navbar } from 'react-materialize';

import SigninModal from '../Signin/SigninModal'
import RegisterModal from '../Register/RegisterModal'
import Search from '../Search/Search'

import {resetBookList, logout, close_modal} from '../../actions'

class TopNavbar extends React.Component{

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
					<div>
						<Navbar isOpen={false} className="black"  alignLinks="right"  brand={<Link to='/' className="brand-logo">
							Book Friends
							</Link>}>	
							<Search />
							<Link to='/' className='sidenav-close'>
								<button className='btn-flat nav-button-item sidenav-close'>
									Home
								</button>
							</Link>  																
							<Link to={`/profile/${this.props.user.id}`} className='sidenav-close'>
								<button className='btn-flat nav-button-item sidenav-close'>
									Profile
								</button>
							</Link> 
							<Link to='/settings' className='sidenav-close'>
								<button className='btn-flat nav-button-item sidenav-close'>
									<Icon>
										settings
									</Icon>
								</button>
							</Link>
							<Link to='/' className='sidenav-close' onClick={this.signout}>
								<button className='btn-flat nav-button-item sidenav-close'>
									Signout
								</button>
							</Link>
						</Navbar>
						</div>
					:	<div>
						<Navbar className="black"  alignLinks="right" brand={<Link to='/' className="brand-logo">Book Friends</Link>}>
							<SigninModal 
								className='sidenav-close' 
								buttonSigninStyle={'btn-flat nav-button-item sidenav-close'} 
								emailId={'nav_signin_email_id'} passwordId={'nav_signin_password_id'}

							/>							
							<RegisterModal  
								className='sidenav-close' 
								buttonRegisterStyle={'btn-flat nav-button-item sidenav-close'} 
								mailId={'nav_register_email_id'} confirmPasswordId={'nav_register_confirmPassword_id'} passwordId={'nav_register_password_id'} nameId={'nav_register_name_id'}
							/>							
						</Navbar>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps= (state) =>{
	return{
		isAuthenticate: state.Authentication.isAuthenticate,
		isLoading: state.Authentication.isLoading,
		user:state.Authentication.user
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
