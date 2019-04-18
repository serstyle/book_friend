import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'


import {Row, Preloader} from 'react-materialize'

import BookListToRead from './BookListProfile/BookListToRead'
import BookListFinish from './BookListProfile/BookListFinish'
import BookListReading from './BookListProfile/BookListReading'


const mapStateToProps= (state) =>{
	return{
        isAuthenticate: state.Authentication.isAuthenticate,
        user: state.Authentication.user,
        isLoading: state.Authentication.isLoading,
        userBookList: state.userBookList.bookList,
        isNotification: state.userBookList.isShowingNotification,
        isError:state.userBookList.isError,
        isSuccess:state.userBookList.isSuccess,
        isBookPending: state.requestBookById.isPending
}
}
class Profile extends React.Component{
	render(){
        return (
        	<div>
                        {this.props.isNotification?
                                <p className='alert alert-danger'>Book Deleted !</p>
                                :
                                null
                        }
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
                        {
                        this.props.isLoading ?
                                <Preloader className='preloader' size="big" />
                                :
                                this.props.isAuthenticate?
                                        <Row className='profile-row'>
                                                <BookListToRead />
                                                <BookListReading />
                                                <BookListFinish />
                                        </Row>
                                        :
                                        <Redirect to='/' />
                        }
		</div>                 
        )
	}
}

export default connect(mapStateToProps)(Profile)