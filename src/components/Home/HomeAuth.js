import React from 'react'
import {connect} from 'react-redux'

import {Preloader} from 'react-materialize';

import Search from '../Search/Search'


const mapStateToProps = state =>{
    return{
      bookList: state.userBookList.bookList,
      isPending: state.userBookList.isPending,
      bookListReading: state.userBookList.bookListReading,
      isPendingBookReading: state.userBookList.isPendingBookReading,      
      isLoading: state.Authentication.isLoading,
      user: state.Authentication.user
    }
  }
class HomeAuth extends React.Component {
    render(){
        return(
            <div className='container'>
                    {this.props.isPending && this.props.isPendingBookReading && this.props.isLoading?
                        <Preloader className='preloader' size="big" />
                        :
                        <div>
                            <h1 className='center-align'>Hello {this.props.user.name} !</h1>
                            <hr />
                            <Search />
                            <p style={{fontStyle:'italic'}}>{this.props.bookList.length === 0 && this.props.bookListReading.length === 0?'Add some book to your list by using the search barre!': null}</p>
                            <h6>You have {this.props.bookList.length} books to read ! </h6>
                            <h6>You are curently reading {this.props.bookListReading.length} books !</h6>
                        </div>
                    }
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeAuth);