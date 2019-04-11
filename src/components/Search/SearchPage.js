import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {Preloader, Chip} from 'react-materialize';

import { loadUser } from '../../actions'

import Search from './Search'
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
      isError: state.userBookList.isError
    }
  }
class SearchPage extends React.Component {
    componentDidMount(){
        this.props.loadUser()
    }

    displayError = () => {
        
    }

    render(){
        const isConnect = 
            <div>
                <Search />
                {this.props.isPending?
                    (<Preloader className='preloader' size="big" />)
                    :
                    this.props.bookList?
                        <BookList />
                        :
                        <p>Start Searching a book</p>}
            </div>

        return(
            <div>
                {this.props.isError?
                    <Chip className='error-booklist red'>
                        The limit of book in a list is 5 !
                    </Chip>
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