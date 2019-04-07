import React from 'react'
import HomeAuth from './HomeAuth'
import HomeVisitor from './HomeVisitor'
import {connect} from 'react-redux'
import {onRouteChange} from '../../actions'

const mapDispatchToProps = (dispatch) =>{
        return{
                onRouteChange:(route) => dispatch(onRouteChange(route)) 
        }
}

class Home extends React.Component{
	componentDidMount(){
		this.props.onRouteChange(this.props.location.pathname)
		console.log(this.props.location)
	}
	render(){
		return (
			<div>
				{
					this.props.isAuthenticate? 
					<HomeAuth />
				:
					<HomeVisitor />
				}
			</div>                 
			)

	}
}
const mapStateToProps= (state) =>{
	return{
		isAuthenticate: state.Authentication.isAuthenticate,
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)