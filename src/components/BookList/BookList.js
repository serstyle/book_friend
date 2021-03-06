import React from 'react'
import {connect} from 'react-redux'
import {Preloader} from 'react-materialize';
import Book from '../Book/Book'

 const mapStateToProps = state =>{
    return{
    	bookList: state.onSubmitBook.bookList,
		isPending: state.onSubmitBook.isPending,
		error: state.onSubmitBook.error,
		search: state.onSubmitBook.search
    }
}


class BookList extends React.Component{
	render(){
	const books = this.props.bookList[0].id.length?
		this.props.bookList.map (book =>{
			return(<Book
				 key={book.id} 
				 bookid={book.id}
				 title={book.volumeInfo.title}
				 authors={book.volumeInfo.authors?book.volumeInfo.authors[0]:'Unknow'}
				 image={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:'/media/book_cover.jpg'}
				 description={book.volumeInfo.description?book.volumeInfo.description:'No description'}
				/>)
		})
		:
		<Preloader className='valign-wrapper, center-align' size="big" />
	return(
		<div>
			<h4>Result for {this.props.search} : </h4>
			<div className='row'>
				{books}
			</div>
		</div>
		)
	}
}

export default connect(mapStateToProps)(BookList);