import React from 'react';
import {connect} from 'react-redux'
import {setSearchChange, onSubmitBook} from '../../actions'
import { withRouter } from 'react-router-dom'
 const mapDispatchToProps = (dispatch) =>{
    return{
      onSearchChange: (event) => dispatch(setSearchChange(event.target.value)),
      onSubmitBook: () => dispatch(onSubmitBook())
  }
}

const mapStateToProps= (state) =>{
	return{
		input: state.searchChange.input,
}
}

class Search extends React.Component{
	
	onSubmit = (e) =>{
    e.preventDefault()
		this.props.onSubmitBook()
		this.props.history.push('/search')
  	}
	
	
	render(){
		return(
			<div className='nav-wrapper'>
			<form onSubmit={this.onSubmit}>
				<div className="input-field">
					<input placeholder='Search books here' onChange={this.props.onSearchChange}  id="search" type="search" required />
					<label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
					<i className="material-icons">close</i>
				</div>
			</form>
			</div>
			)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));