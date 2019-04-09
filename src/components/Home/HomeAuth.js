import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import {Preloader} from 'react-materialize';

import Search from '../Search/Search'


const mapStateToProps = state =>{
    return{
      bookList: state.onSubmitBook.bookList,
      isPending: state.onSubmitBook.isPending,
      error: state.onSubmitBook.error
    }
  }
class HomeAuth extends React.Component {
    render(){
        return(
            <div>
                <Search />
                    {this.props.isPending?
                        <Preloader className='preloader' size="big" />
                        :
                        this.props.bookList?
                        
                        <Redirect to='/search' />
                        :<p>welcome francois</p>
                    }
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeAuth);