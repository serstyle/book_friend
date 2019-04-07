import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {Preloader} from 'react-materialize';

import Search from './Search'
import BookList from '../BookList/BookList'


const mapStateToProps = state =>{
    return{
      bookList: state.onSubmitBook.bookList,
      isPending: state.onSubmitBook.isPending,
      isAuthenticate: state.Authentication.isAuthenticate
    }
  }
class SearchPage extends React.Component {
    render(){
        const isConnect = 
            <div>
                <Search />
                {this.props.isPending?
                (<Preloader size="big" />)
                :
                this.props.bookList?
                <BookList />
                :
                <p>Start Searching a book</p>}
            </div>

        return(
            <div>
            {this.props.isAuthenticate? 
                [isConnect]
                :<Redirect to='/' /> }
            </div>
        )
    }
}

export default  connect(mapStateToProps)(SearchPage);