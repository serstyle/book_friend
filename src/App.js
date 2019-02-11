import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Home from './components/Home'
import { setSearchChange, onSubmitBook } from './actions'


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
                <Route path='/signin' render={(props) => <Signin {...props} onSubmit={this.onSubmit} />} />
              </Switch>
          </div>
        </BrowserRouter> 
    );
  }
}

export default connect(mapStateToProps)(App);
