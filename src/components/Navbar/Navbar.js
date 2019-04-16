import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { Icon } from 'react-materialize';

import SigninModal from '../Signin/SigninModal'
import RegisterModal from '../Register/RegisterModal'
import Search from '../Search/Search'

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
			<nav className="nav-wrapper black">
				{this.props.isLoading?
				null
				:
				<div>
					<Link to='/' onClick={this.props.resetBookList} className="brand-logo">Book Friends</Link>
						{this.props.isAuthenticate? 
							<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><Search /></li>
								<li>
									<Link to='/' onClick={this.props.resetBookList}><button className='btn-flat nav-button-item'>Home</button></Link>  
								</li>
								<li>
									<Link to='/profile'><button className='btn-flat nav-button-item'>Profile</button></Link> 
								</li>
								<li style={{'margin-top': '4px'}}>
									<Link to='/settings'><Icon>settings</Icon></Link>				
								</li>
								<li>
									<Link to='/' onClick={this.signout}>
										<button className='btn-flat nav-button-item'>Signout</button>
									</Link>
								</li>
							</ul>
						:
						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li>
								<SigninModal buttonSigninStyle={'btn-flat nav-button-item'} emailId={'nav_signin_email_id'} passwordId={'nav_signin_password_id'}/>
							</li>
							<li>
								<RegisterModal buttonRegisterStyle={'btn-flat nav-button-item'} emailId={'nav_register_email_id'} passwordId={'nav_register_password_id'} nameId={'nav_register_name_id'}/>
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



// {this.props.route === '/profile'?
// <Link to='/' onClick={this.props.resetBookList}>Home</Link>  
// : 
// <Link to='/profile'>Profile</Link> 
// }
