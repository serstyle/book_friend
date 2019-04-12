import React from 'react'
import {connect} from 'react-redux'
import {Preloader} from 'react-materialize';
import Book from '../Book/Book'

 const mapStateToProps = state =>{
    return{
    	bookList: state.onSubmitBook.bookList,
		isPending: state.onSubmitBook.isPending,
		error: state.onSubmitBook.error
    }
}


class BookList extends React.Component{
	render(){
	console.log(this.props.bookList)
	const books = this.props.bookList[0].id.length?
		this.props.bookList.map (book =>{
			return(<Book
				 key={book.id} 
				 bookid={book.id}
				 title={book.volumeInfo.title}
				 authors={book.volumeInfo.authors?book.volumeInfo.authors[0]:'unknow'}
				 image={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:'/media/book_cover.jpg'}
				 description={book.volumeInfo.description?book.volumeInfo.description:'no description'}
				/>)
		})
		:
		<Preloader className='preloader' size="big" />
	return(
		<div className='row container bg-white'>
			{books}
		</div>
		)
	}
}

export default connect(mapStateToProps)(BookList);