import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Home from './components/Home'
import { setSearchChange, onSubmitBook } from './actions'


  const mapStateToProps = state =>{
    return{
      input: state.searchChange.input,
      bookList: state.onSubmitBook.bookList,
      isPending: state.onSubmitBook.isPending,
      error: state.onSubmitBook.error
    }
  }

  const mapDipatchToProps = (dispatch) =>{
    return{
      onSearchChange: (event) => dispatch(setSearchChange(event.target.value)),
      onSubmitBook: () => dispatch(onSubmitBook())
    }
  }


class App extends Component {


  onSubmit = (e) =>{
    e.preventDefault()
    this.props.onSubmitBook()
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
            <Switch className='container'>
              <Route exact path='/' render={(props) => <Home {...props} onSubmit={this.onSubmit}  />} />
              <Route path='/signin' render={(props) => <Signin {...props} onSubmit={this.onSubmit}  />} />
            </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(App);
