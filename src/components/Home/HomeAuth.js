import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import{getAllReviews} from '../../actions'
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
      user: state.Authentication.user,
      isPendingReviews:state.getAllReviews.isPending,
      reviews: state.getAllReviews.reviews,
      follow: state.follow.follows
    }
  }
class HomeAuth extends React.Component {
    componentDidMount(){
        this.props.getAllReviews(this.props.user.id)
    }
    render(){
        return(
            <div className='container'>
                    {this.props.isPending || this.props.isPendingBookReading || this.props.isPendingBookFinish || this.props.isLoading || this.props.isPendingReviews?
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
                            <OtherLastReviews reviews={this.props.reviews} user={this.props.user} title={'The last 10 reviews from you and people that you follow'} id={this.props.user.id}/>
                        </div>
                    }
                            <p className='discret'>See all users <Link to='/users'>here</Link></p>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getAllReviews: (id)=>dispatch(getAllReviews(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAuth);