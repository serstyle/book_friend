import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import SearchPage from './components/Search/SearchPage'

const mapStateToProps = state =>{
  return{
    bookList: state.onSubmitBook.bookList,
    isPending: state.onSubmitBook.isPending,
    error: state.onSubmitBook.error
  }
}


class App extends Component {


  render() {
    return (
        <BrowserRouter>
          <div>
            <Navbar />
              <Switch className='container'>
                <Route exact path='/' render={(props) => <Home {...props} bookList={this.props.bookList}  />} />
                <Route path='/profile' render={(props) => <Profile {...props} />} />
                <Route path='/search' render={(props) => <SearchPage {...props} />} />
              </Switch>
          </div>
        </BrowserRouter> 
    );
  }
}

export default connect(mapStateToProps)(App);
