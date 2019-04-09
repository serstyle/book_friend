import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {onRouteChange} from '../../actions'
import { loadUser } from '../../actions'

import {Preloader} from 'react-materialize'

const mapDispatchToProps = (dispatch) =>{
        return{
                onRouteChange:(route) => dispatch(onRouteChange(route)),
                loadUser: ()=>dispatch(loadUser())
        }
}
const mapStateToProps= (state) =>{
	return{
        isAuthenticate: state.Authentication.isAuthenticate,
        user: state.Authentication.user,
        isLoading: state.Authentication.isLoading
}
}
class Profile extends React.Component{
        componentDidMount(){
                this.props.onRouteChange(this.props.location.pathname)
                this.props.loadUser()
	}
	render(){
        return (
        	<div>
                        {
                        this.props.isLoading?
                                <Preloader className='preloader' size="big" />
                                :
                                this.props.isAuthenticate?
                                        <p>Welcome {this.props.user.name}</p>
                                        :
                                        <Redirect to='/' />
                        }
		</div>                 
        )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)