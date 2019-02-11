import React from 'react';
import {connect} from 'react-redux'
import {setSearchChange, onSubmitBook} from '../actions'

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
  	}
	
	render(){
		return(
			<form onSubmit={this.onSubmit}>
				<input placeholder='Search books here' onChange={this.props.onSearchChange} type='text' />
			</form>
			)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)