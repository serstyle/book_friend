import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {Preloader} from 'react-materialize';

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
      isLoading: state.Authentication.isLoading
    }
  }
class SearchPage extends React.Component {
    componentDidMount(){
        this.props.loadUser()
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
                {   
                    this.props.isLoading?
//isLoading is useful for rerender the actual page when actualize and still have the token 
//if not the this.props.autheticate gonna be false then rerender to the main page(because when actualize the authentication is false)
//then once the loadUser function is finish the isauthenticate is true but true for where the dom is (probably route '/')
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