import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {Preloader} from 'react-materialize';

import { loadUser } from '../../actions'

import BookList from '../BookList/BookList'

const mapDispatchToProps = dispatch => {
    return{
        loadUser: ()=> dispatch(loadUser())
    }
}

const mapStateToProps = state =>{
    return{
      bookList: state.onSubmitBook.bookList,
      isPending: state.onSubmitBook.isPending,
      isAuthenticate: state.Authentication.isAuthenticate,
      isLoading: state.Authentication.isLoading,
      isError: state.userBookList.isError,
      isSuccess: state.userBookList.isSuccess
    }
  }
class SearchPage extends React.Component {
    componentDidMount(){
        this.props.loadUser()
    }

    render(){
        const isConnect = 
            <div key='search_page' className='container'>
                {this.props.isPending?
                    (<Preloader className='preloader' size="big" />)
                    :
                    this.props.bookList?
                        <BookList />
                        :
                        <p className="center-align">Use the Search barre to search a book from the Google Books API </p>}
            </div>

        return(
            <div>
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
                    this.props.isLoading?
//isLoading is useful for rerender the actual page when actualize and still have the token 
//if not the this.props.autheticate gonna be false then rerender to the main page(because when actualize the authentication is false)
//then once the loadUser function is finish the isauthenticate is true but true for where the page is (probably route '/')
                        <Preloader className='preloader' size="big" />
                        :
                        this.props.isAuthenticate? 
                            [isConnect]
                            :
                            <Redirect to='/' /> 
                }
            </div>
        )
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(SearchPage);