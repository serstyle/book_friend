import React from 'react'
import {connect} from 'react-redux'
import {authSignin} from '../../actions'

// <form onSubmit={this.onSubmit}>
// 					<label htmlFor='email'/>
//     			<input type="text" placeholder='Email' id='email' require="email" onChange={e => this.setState({email:e.target.value}) } />
// 					<label htmlFor='password'/>
//     			<input type="password" placeholder='Password' id='password' onChange={e => this.setState({password:e.target.value}) } />
// 				<input type='submit' />
// 			</form>

const mapDispatchToProps = (dispatch) =>{
    return{
			authSignin: (user) => dispatch(authSignin(user)),
  }
}


class Signin extends React.Component {
	state={
		email:'',
		password:''
	}
	onSubmit = e =>{
		e.preventDefault();
		this.props.authSignin(this.state)
		this.props.closeModal()
	}
	render(){
		return(
			<div className="row">
				<form className="col s12" onSubmit={this.onSubmit}>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input id="signinEmail" type="email" required className="validate" onChange={e => this.setState({email:e.target.value}) } />
							<label htmlFor="signinEmail">Email</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input id="signinPassword" type="password" required className="validate" onChange={e => this.setState({password:e.target.value}) } />
							<label htmlFor="signinPassword">Password</label>
						</div>
					</div>
					<button type='submit' className='btn waves-effect waves-light'>Submit</button>
				</form>
				</div>
			)
	}
}

export default connect(null, mapDispatchToProps)(Signin)