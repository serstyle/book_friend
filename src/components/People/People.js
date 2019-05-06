import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {getFollows, addFollow, unFollow} from '../../actions'
import {Row, Col, Collection, CollectionItem, Button, Preloader} from 'react-materialize'
import SearchPeople from './SearchPeople'
export class People extends Component {
    state={
        users:[]
    }

    componentDidMount(){
        fetch(`${process.env.REACT_APP_DOMAIN}users`)
        .then(res => res.json())
        .then(data => this.setState({users:data}))
    }

    userSearch = (users) =>{
        console.log('trigger')
        this.setState({users: users})

    }
  render() {
      const users = !this.props.isLoading && this.state.users.map(user => {
          return (
            user.id !== this.props.user.id && 
            <CollectionItem key={user.id} style={{display:'flex', justifyContent:'space-between'}}>
            <div>
                <h5 className="title">
                    {user.name}
                </h5>
                <Link to={`/profile/${user.id}`}><p>Profile</p></Link>
            </div>
            {this.props.follows.filter(e => e.id === user.id).length > 0? //look if there is a the same id in the props follows state
                <Button
                    onClick={()=>this.props.unFollow(user.id, this.props.user.id)}
                >
                    UNFOLLOW
                </Button>
            :
                <Button
                    onClick={()=>this.props.addFollow(user.id, this.props.user.id)}
                >
                    FOLLOW
                </Button>
            }
        </CollectionItem>
          )
      })
    return (
        this.props.isLoading ?
            <Preloader className='preloader' size="big" />
            :
            this.props.isAuthenticate? //need to fix if refresh go at home
                !this.props.isPending && <Row className='container'>
                    <SearchPeople userSearch={this.userSearch}/>
                    <Col m={12} s={12}>
                        <Collection>
                            {users}
                        </Collection>
                    </Col>
                </Row>
                :
                <Redirect to='/' />
    )
  }
}

const mapStateToProps = state =>{
    return{
        follows: state.follow.follows,
        user: state.Authentication.user,
        isLoading: state.Authentication.isLoading,
        isAuthenticate: state.Authentication.isAuthenticate,
        isPending: state.follow.isPending
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFollows: (follow_by_id) => dispatch(getFollows(follow_by_id)),
        addFollow: (user_id, follow_by_id) => dispatch(addFollow(user_id, follow_by_id)),
        unFollow: (user_id, follow_by_id) => dispatch(unFollow(user_id, follow_by_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(People)
