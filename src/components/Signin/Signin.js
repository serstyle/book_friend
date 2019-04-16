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
	// componentDidUpdate(prevState){
	// 	if()
	// 	this.setState({password:''})
	// }
	onSubmit = e =>{
		e.preventDefault();
		this.props.authSignin(this.state)
	}
	render(){
		return(
			<div className="row">
				<form className="col s12" onSubmit={this.onSubmit}>
					<div className="row">
						{this.props.isError?
							<p className='red-text bold'>Wrong password/email</p>
							:
							null
							}
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input id={this.props.emailId} type="email" required className="validate" onChange={e => this.setState({email:e.target.value}) } />
							<label htmlFor={this.props.emailId}>Email</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input id={this.props.passwordId} type="password" required className="validate" onChange={e => this.setState({password:e.target.value}) } />
							<label htmlFor={this.props.passwordId}>Password</label>
						</div>
					</div>
					<button type='submit' className='btn waves-effect waves-light'>Submit</button>
				</form>
				</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		isError: state.Authentication.isError
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)