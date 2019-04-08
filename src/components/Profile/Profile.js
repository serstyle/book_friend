import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {onRouteChange} from '../../actions'

const mapDispatchToProps = (dispatch) =>{
        return{
                onRouteChange:(route) => dispatch(onRouteChange(route)) 
        }
}
const mapStateToProps= (state) =>{
	return{
        isAuthenticate: state.Authentication.isAuthenticate,
        user: state.Authentication.user
}
}
class Profile extends React.Component{
        componentDidMount(){
                this.props.onRouteChange(this.props.location.pathname)
                console.log(this.props.location)
	}
	render(){
        return (
        	<div>
                {this.props.isAuthenticate?
                <p>Welcome {this.props.user.email}</p>
                    :
                <Redirect to='/' />
                }
			</div>                 
        )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)