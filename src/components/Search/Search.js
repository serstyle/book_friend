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
			<div class='nav-wrapper'>
			<form onSubmit={this.onSubmit}>
				<div class="input-field">
					<input placeholder='Search books here' onChange={this.props.onSearchChange}  id="search" type="search" required />
					<label class="label-icon" for="search"><i class="material-icons">search</i></label>
					<i class="material-icons">close</i>
				</div>
			</form>
			</div>
			)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));