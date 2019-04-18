import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {onSubmitBookById, loadUser, getReviews, addReviewToggleContainer} from '../../actions'
import {Preloader, Row, Col} from 'react-materialize'
import Book from '../Book/Book'
import BookReview from './BookReview/BookReview'
import AddReview from './AddReview/AddReview'

class BookPage extends React.Component{
    state={
        isOpen:false
    }
    componentDidMount(){
        this.props.loadUser()
        const bookid = this.props.match.params.book
        this.props.onSubmitBookById(bookid)
        this.props.getReviews(bookid)
    }

    render(){
        const {book} = this.props
        return(
            <div className='container'>
                {
                this.props.isLoading?
                    <Preloader className='preloader'/>
                    :
                    !this.props.isAuthenticate?
                        <Redirect to='/' />
                        :
                        this.props.isPending?
                            <Preloader className='preloader'/>
                            :
                            this.props.err?
                                <p>There is no book with this ID, please enter a correct ID</p>
                                : 
                                <div>
                                    <Row>
                                        <Col s={0} m={12} l={6}>
                                        <Book
                                        key={book.id} 
                                        bookid={book.id}
                                        title={book.volumeInfo.title}
                                        authors={book.volumeInfo.authors?book.volumeInfo.authors[0]:'Unknow'}
                                        image={book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:'/media/book_cover.jpg'}
                                        description={book.volumeInfo.description?book.volumeInfo.description:'No description'}
                                        />
                                        </Col>
                                            <Col s={12} m={6} l={6}> 
                                                <h5>
                                                {this.props.note >= 0?
                                                    `Evaluation : ${this.props.note}/5`
                                                    :
                                                    'There is no evaluation for now'
                                                }
                                                </h5>
                                            </Col>
                                            <Col s={12} m={6} l={6}>
                                                <button onClick={() => this.props.addReviewToggleContainer()} className='btn'>Add a Review</button>
                                            </Col> 
                                    </Row>
                                    {this.props.isOpen?
                                    <AddReview id='addreview' booktitle={book.volumeInfo.title} bookid={book.id}/>
                                    :
                                    null}
                                    <BookReview  />
                                </div>
                }
                {this.props.isAddSuccess?
                <p className='alert alert-success'>Add a comment with success !</p>
                :
                null}
                {this.props.isError?
                    <p className='alert alert-danger'>
                        The limit of book in a list is 10 !
                    </p>
                    :
                    null
                }
                {this.props.isSuccess?
                    <p className='alert alert-success'>
                        Book added !
                    </p>
                    :
                    null
                }
                {this.props.isDelSuccess?
                <p className='alert alert-danger'>Deleted your comment with success !</p>
                :
                null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmitBookById: (bookid) => dispatch(onSubmitBookById(bookid)),
        loadUser: ()=>dispatch(loadUser()),
        getReviews: (bookid) => dispatch(getReviews(bookid)),
        addReviewToggleContainer: ()=> dispatch(addReviewToggleContainer())
    }
}

const mapStateToProps = state => {
    return{
        book: state.requestBookById.book,
        err: state.requestBookById.err,
        isPending: state.requestBookById.isPending,
        isAuthenticate: state.Authentication.isAuthenticate,
        isLoading: state.Authentication.isLoading,
        isAddSuccess: state.reviewsBook.isSuccess,
        isDelSuccess: state.reviewsBook.isDelSuccess,
        isOpen: state.reviewsBook.isOpen,
        note: state.reviewsBook.note,
        isError: state.userBookList.isError,
        isSuccess: state.userBookList.isSuccess
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)