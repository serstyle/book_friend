import React from 'react'
import BookList from './BookList'
import Search from './Search'

const Home = ({onSubmit, bookList}) => {
	return (
		<div>
			<Search onSubmit={onSubmit}/>
          			{bookList?
                    <BookList />
                    :
                    <p> Welcome on BookFRIENDS </p>}
        </div>                 
		)
}

export default Home