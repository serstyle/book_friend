import React from 'react';
import {connect} from 'react-redux'
import {Col, Collection, CollectionItem, Preloader} from 'react-materialize'

import BookFinish from './BookFinish/BookFinish'

class BookListFinish extends React.Component{

    render(){
        const bookItem = (
            this.props.bookList.length?
                        this.props.bookList.map((book, i) =>{
                            return(
                                <BookFinish 
                                    key={i}
                                    title={book.title}
                                    authors={book.authors}
                                    description={book.description}
                                    bookid={book.bookid}
                                />
                            )
                        })
                        :
                        <p style={{'textAlign': 'center'}}>Add book from your Currently Reading list !</p>
        )
            return(
                
                    <Col l={4} m={12} s={12}>
                        <Collection className='white collection-list'>
                        <CollectionItem><h4>Already Read</h4></CollectionItem>
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
            bookList: state.userBookList.bookListFinish,
            isPending: state.userBookList.isPendingFinish
        }
    }

    export default connect(mapStateToProps)(BookListFinish);