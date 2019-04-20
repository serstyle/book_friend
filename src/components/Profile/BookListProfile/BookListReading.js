import React from 'react';
import {connect} from 'react-redux'
import {Col, Collection, CollectionItem, Preloader} from 'react-materialize'

import BookReading from './BookReading/BookReading'

class BookListReading extends React.Component{

    render(){
        const bookItem = (
            this.props.bookList.length?
                        this.props.bookList.map((book, i) =>{
                            return(
                                <BookReading 
                                    key={i}
                                    title={book.title}
                                    authors={book.authors}
                                    description={book.description}
                                    bookid={book.bookid}
                                />
                            )
                        })
                        :
                        <p className='discret' style={{'textAlign': 'center'}}>Add book from your Book To Read list !</p>
        )
            return(
                
                    <Col l={4} m={12} s={12}>
                        <Collection className='white collection-list'>
                        <CollectionItem><h4>Currently Reading</h4></CollectionItem>
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
            bookList: state.userBookList.bookListReading,
            isPending: state.userBookList.isPendingReading
        }
    }

    export default connect(mapStateToProps)(BookListReading);