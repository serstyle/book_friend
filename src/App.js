import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import TopNavbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import SearchPage from './components/Search/SearchPage'
import Settings from './components/Settings/Settings'
import BookPage from './components/BookPage/BookPage'
import OtherProfile from './components/OtherProfile/OtherProfile'
import Follows from './components/Follows/Follows'
import Followers from './components/Followers/Followers'
import People from './components/People/People'
// import FooterPage from './components/FooterPage/FooterPage'

import { loadUser } from './actions'

const mapStateToProps = state =>{
  return{
    bookList: state.onSubmitBook.bookList,
    isPending: state.onSubmitBook.isPending,
    error: state.onSubmitBook.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    loadUser: ()=>dispatch(loadUser())
  }
}

class App extends Component {

  componentDidMount(){
    this.props.loadUser();
  }
  render() {
    return (
        <BrowserRouter>
          <div>
            <TopNavbar />
              <Switch className='container'>
                <Route exact path='/' render={(props) => <Home {...props} bookList={this.props.bookList}  />} />
                <Route exact path='/profile' render={(props) => <Profile {...props} />} />
                <Route exact path='/users' render={(props) => <People {...props} />} />
                <Route path='/search' render={(props) => <SearchPage {...props} />} />
                <Route path='/settings' render={(props) => <Settings {...props} />} />
                <Route path='/book/:book' render={(props) => <BookPage {...props} />} />
                <Route exact path='/profile/:id' render={(props) => <OtherProfile {...props} />} />
                <Route path='/profile/:id/follows' render={(props) => <Follows {...props} />} />
                <Route path='/profile/:id/followers' render={(props) => <Followers {...props} />} />
              </Switch>
            {/* <FooterPage /> */}
          </div>
        </BrowserRouter> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
