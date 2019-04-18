import React from 'react'
import {connect} from 'react-redux'

import {Preloader} from 'react-materialize';

import HomeAuth from './HomeAuth'
import HomeVisitor from './HomeVisitor'

class Home extends React.Component{
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
export default connect(mapStateToProps)(Home)