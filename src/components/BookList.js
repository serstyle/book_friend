import React from 'react'
import Book from './Book'

const BookList = ({ booklist }) =>{
	const books = booklist[0].id.length?
		booklist.map (book =>{
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
		<div className='row'>
			{books}
		</div>
		)
}

export default BookList;