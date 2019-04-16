import React from 'react'
import {connect} from 'react-redux'

import { loadUser } from '../../actions'

import {Preloader} from 'react-materialize';

import HomeAuth from './HomeAuth'
import HomeVisitor from './HomeVisitor'

const mapDispatchToProps = (dispatch) =>{
        return{
		loadUser: ()=> dispatch(loadUser())
        }
}

class Home extends React.Component{
	componentDidMount(){
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
						<HomeAuth />
						:
						<HomeVisitor className='container'/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)