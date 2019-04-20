import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getFollowers, addFollow, unFollow} from '../../actions'
import {Row, Col, Collection, CollectionItem, Button, Preloader} from 'react-materialize'
export class Followers extends Component {

    componentDidMount(){
        this.props.getFollowers(this.props.match.params.id)
    }
  render() {
      const followers = this.props.followers.map((follower, id)=>{
        console.log('test')
        return (
            <CollectionItem key={id} style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                    <h5 className="title">
                        {follower.name}
                    </h5>
                    <Link to={`/profile/${follower.id}`}><p>Profile</p></Link>
                </div>
                {this.props.follows.filter(e => e.id === follower.id).length > 0? //look if there is a the same id in the props follows state
                    <Button
                        onClick={()=>this.props.unFollow(follower.id, this.props.user.id)}
                    >
                        UNFOLLOW
                    </Button>
                :
                    <Button
                        onClick={()=>this.props.addFollow(follower.id, this.props.user.id)}
                    >
                        FOLLOW
                    </Button>
                }
            </CollectionItem>
        )
      })
    return (
      <div className='container'>
      <h2>Followers</h2>
        {this.props.isPending?
        <Preloader className='preloader' size="big"/>
        :
        this.props.followers.length?
        <Row>
            <Col m={12} s={12}>
                <Collection>
                    {followers}
                </Collection>
            </Col>
        </Row>
        :
        <p>You have no followers</p>
        }

      </div>
    )
  }
}

const mapStateToProps = state =>{
    return{
        followers: state.follow.followers,
        follows:state.follow.follows,
        user:state.Authentication.user,
        isPending:state.follow.isPending
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getFollowers: (user_id) => dispatch(getFollowers(user_id)),
        addFollow: (user_id, follow_by_id) => dispatch(addFollow(user_id, follow_by_id)),
        unFollow: (user_id, follow_by_id) => dispatch(unFollow(user_id, follow_by_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers)
