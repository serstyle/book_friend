import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {onRouteChange} from '../../actions'
import { loadUser } from '../../actions'

import {Row, Preloader} from 'react-materialize'

import BookListToRead from './BookListProfile/BookListToRead'
import BookFinish from './BookListProfile/BookFinish'
import BookReading from './BookListProfile/BookReading'

const mapDispatchToProps = (dispatch) =>{
        return{
                onRouteChange:(route) => dispatch(onRouteChange(route)),
                loadUser: ()=>dispatch(loadUser())
        }
}
const mapStateToProps= (state) =>{
	return{
        isAuthenticate: state.Authentication.isAuthenticate,
        user: state.Authentication.user,
        isLoading: state.Authentication.isLoading,
        userBookList: state.userBookList.bookList,
        isNotification: state.userBookList.isShowingNotification
}
}
class Profile extends React.Component{
        componentDidMount(){
                this.props.onRouteChange(this.props.location.pathname)
                this.props.loadUser()
        }
        handleBook = () => {
                console.log(this.props.userBookList)
        }
	render(){
        return (
        	<div>
                        {this.props.isNotification?
                                <p className='alert-danger'>Book Deleted !</p>
                                :
                                null
                        }
                        {
                        this.props.isLoading?
                                <Preloader className='preloader' size="big" />
                                :
                                this.props.isAuthenticate?
                                        <Row>
                                                <BookListToRead />
                                                <BookReading />
                                                <BookFinish />
                                        </Row>
                                        :
                                        <Redirect to='/' />
                        }
		</div>                 
        )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)