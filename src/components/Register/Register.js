import React from 'react'
import {connect} from 'react-redux'
import {authRegister} from '../../actions'

class Register extends React.Component {
	state={
		email:'',
        password:'',
        name:''
	}
	onSubmit = e =>{
		e.preventDefault();
		console.log(this.state)
		this.props.authRegister(this.state)
		this.props.closeRegModal()
	}
	render(){
		return(
			<div className="row">
				<form className="col s12" onSubmit={this.onSubmit}>
					<div className="row">
						<div className="input-field col s12">
							<i className="material-icons prefix">email</i>
							<input id="registerEmail" type="email" required className="validate" onChange={e => this.setState({email:e.target.value}) } />
							<label htmlFor="registerEmail">Email</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">lock</i>
							<input id="registerPassword" type="password" required className="validate" onChange={e => this.setState({password:e.target.value}) } />
							<label htmlFor="registerPassword">Password</label>
						</div>
						<div className="input-field col s12">
							<i className="material-icons prefix">account_circle</i>
							<input id="registerName" type="text" required className="validate" onChange={e => this.setState({name:e.target.value}) } />
							<label htmlFor="registerName">Name</label>
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

export default connect(null, mapDispatchToProps)(Register)