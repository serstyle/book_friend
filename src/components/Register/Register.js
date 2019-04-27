import React from 'react'
import {connect} from 'react-redux'
import {authRegister} from '../../actions'

class Register extends React.Component {
	state={
		email:'',
		password:'',
		confirmPassword:'',
		name:''
	}
	onSubmit = e =>{
		e.preventDefault()
		console.log(this.state)
		this.props.authRegister(this.state)
	}
	render(){
		return(
			<div className="row">
				<form className="col s12" onSubmit={this.onSubmit}>
					<div className="row">
						{this.props.isError?
						<p className='red-text bold'>Please use an other email</p>
						:
						null
						}
						{this.props.isWrongPassword?
						<p className='red-text bold'>Both passwords are different</p>
						:
						null
						}
						<div className="input-field col s12">
							<i className="material-icons prefix">email</i>
							<input id={this.props.emailId} type="email" required className="validate" onChange={e => this.setState({email:e.target.value}) } />
							<label htmlFor={this.props.emailId}>Email</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input id={this.props.nameId} type="text" required className="validate" onChange={e => this.setState({name:e.target.value}) } />
							<label htmlFor={this.props.nameId}>Name</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input id={this.props.passwordId} type="password" required className="validate" onChange={e => this.setState({password:e.target.value}) } />
							<label htmlFor={this.props.passwordId}>Password</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input id={this.props.confirmPasswordId} type="password" required className="validate" onChange={e => this.setState({confirmPassword:e.target.value}) } />
							<label htmlFor={this.props.confirmPasswordId}>Confirm password</label>
						</div>
					</div>
					<button type='submit' className='btn waves-effect waves-light'>Submit</button>
				</form>
				</div>
			)
	}
}

const mapDispatchToProps = (dispatch) =>{
    return{
			authRegister: (user) => dispatch(authRegister(user)),
  }
}

const mapStateToProps = (state) => {
	return {
		isError: state.Authentication.isError,
		isWrongPassword: state.Authentication.isWrongPassword
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)