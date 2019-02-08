import React from 'react';

class Search extends React.Component{
	


	render(){
		return(
			<form onSubmit={this.props.onSubmit}>
				<input placeHolder='Search books here'onChange={this.props.onSearchChange} type='text' />
			</form>
			)}
}

export default Search