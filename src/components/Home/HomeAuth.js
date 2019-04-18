import React from 'react'
import {connect} from 'react-redux'

import {Preloader} from 'react-materialize';
import OtherLastReviews from '../OtherProfile/OtherLastReviews/OtherLastReviews'

const mapStateToProps = state =>{
    return{
      bookList: state.userBookList.bookList,
      isPending: state.userBookList.isPending,
      bookListReading: state.userBookList.bookListReading,
      isPendingBookReading: state.userBookList.isPendingBookReading, 
      bookListFinish: state.userBookList.bookListFinish,
      isPendingBookFinish: state.userBookList.isPendingBookFinish,  
      isLoading: state.Authentication.isLoading,
      user: state.Authentication.user
    }
  }
class HomeAuth extends React.Component {

    render(){
        return(
            <div className='container'>
                    {this.props.isPending || this.props.isPendingBookReading || this.props.isPendingBookFinish || this.props.isLoading?
                        <Preloader className='preloader' size="big" />
                        :
                        <div>
                            <h1 className='center-align'>Hello {this.props.user.name} !</h1>
                            <hr style={{'margin':'30px'}}/>
                            
                            <p className='discret'>{this.props.bookList.length === 0 && this.props.bookListReading.length === 0 && this.props.bookListFinish.length === 0?'Add some book to your list by using the search bar!': null}</p>
                            <h6>You have {this.props.bookList.length} {this.props.bookList.length === 1? 'book': 'books'} to read !</h6>
                            <h6>You are curently reading {this.props.bookListReading.length} {this.props.bookListReading.length === 1? 'book': 'books'} !</h6>
                            <h6>You have read {this.props.bookListFinish.length} {this.props.bookListFinish.length === 1? 'book': 'books'} !</h6>
                            <hr style={{'margin':'30px'}}/>
                            <OtherLastReviews title={'Your last reviews'} id={this.props.user.id}/>
                        </div>
                    }
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeAuth);