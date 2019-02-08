import React, { Component } from 'react';
import { connect } from 'react-redux'
import BookList from './BookList'
import Search from './Search'
import Navbar from './Navbar'
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
  state = {
    bookList: '',
  }

  // componentDidMount() {
  //   fetch("https://www.googleapis.com/books/v1/volumes?q=harry+potter")
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data.items)
  //     this.setState({bookList: data.items})})
  // }



  onSubmit = (e) =>{
    e.preventDefault()
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.props.input)
    .then(res => res.json())
    .then(data => {
      console.log(data.items)
      this.setState({bookList: data.items})})
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <h1>book Friend </h1>
          <Search onSearchChange={this.props.onSearchChange} onSubmit={this.onSubmit}/>
          {this.state.bookList?
                    <BookList booklist={this.state.bookList} />
                    :
                    <p> Welcome on BookFRIENDS </p>}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDipatchToProps)(App);
