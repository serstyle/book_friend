import React from 'react';
import {connect} from 'react-redux'
import {Col, Collection, CollectionItem, Preloader} from 'react-materialize'

import BookToRead from './BookToRead/BookToRead'

class BookListToRead extends React.Component{

    render(){
    const bookItem = (
        this.props.bookList.length?
                    this.props.bookList.map((book, i) =>{
                        return(
                            <BookToRead 
                                key={i}
                                title={book.title}
                                authors={book.authors}
                                description={book.description}
                                bookid={book.bookid}
                            />
                        )
                    })
                    :
                    <p>Search book and start adding books !</p>
    )
        return(
            
                <Col l={4} m={12} s={12}>
                    <Collection className='white collection-list'>
                    <CollectionItem><h4>Book To Read</h4></CollectionItem>
                    {this.props.isPending?
                    <Preloader className='preloader' size="big" />
                    :
                    bookItem
                    }
                    </Collection>
                </Col>
         
        )
    }
}

const mapStateToProps = state => {
    return {
        bookList: state.userBookList.bookList,
        isPending: state.userBookList.isPending
    }
}

export default connect(mapStateToProps)(BookListToRead);