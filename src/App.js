import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import SearchPage from './components/Search/SearchPage'
import Settings from './components/Settings/Settings'

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
            <Navbar />
              <Switch className='container'>
                <Route exact path='/' render={(props) => <Home {...props} bookList={this.props.bookList}  />} />
                <Route path='/profile' render={(props) => <Profile {...props} />} />
                <Route path='/search' render={(props) => <SearchPage {...props} />} />
                <Route path='/settings' render={(props) => <Settings {...props} />} />
              </Switch>
          </div>
        </BrowserRouter> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
