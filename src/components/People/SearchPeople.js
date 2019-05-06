import React, { Component } from 'react'
import {
    TextInput
} from 'react-materialize'

export default class SearchPeople extends Component {
    state={
        textInput:'',
        users:[]
    }
    componentDidMount(){
        fetch(`${process.env.REACT_APP_DOMAIN}users`)
        .then(res => res.json())
        .then(data => this.setState({users:data}))
    }
    onInputChange = (e) =>{
        let text = e.target.value

        // fetch(`${process.env.REACT_APP_DOMAIN}users`,
        // {
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({text})
        // }
        // )
        // .then(res => res.json())
        // .then(data => this.props.userSearch(data))

        //without fetching

        let users = this.state.users.filter(user =>{
            return user.name.toLowerCase().includes(text.toLowerCase())
        })
        this.props.userSearch(users)
    }

  render() {
    return (
      <div>
        <TextInput label="Search others users" onChange={this.onInputChange} />
      </div>
    )
  }
}
