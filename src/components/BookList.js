import React from 'react'
import Book from './Book'
import {connect} from 'react-redux'

 const mapStateToProps = state =>{
    return{
    	bookList: state.onSubmitBook.bookList,
		isPending: state.onSubmitBook.isPending,
		error: state.onSubmitBook.error
    }
}


class BookList extends React.Component{
	render(){
	const books = this.props.bookList[0].id.length?
		this.props.bookList.map (book =>{
			return(<Book
				 key={book.id} 
				 title={book.volumeInfo.title}
				 authors={book.volumeInfo.authors?book.volumeInfo.authors[0]:'unknow'}
				 image={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:'#'}
				 description={book.volumeInfo.description}
				/>)
		})
		:
		<div>load</div>
	return(
		<div className='row container'>
			{books}
		</div>
		)
	}
}

export default connect(mapStateToProps)(BookList);