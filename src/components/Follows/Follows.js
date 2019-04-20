import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {getFollows, addFollow, unFollow} from '../../actions'
import {Row, Col, Collection, CollectionItem, Button, Preloader} from 'react-materialize'
export class Follows extends Component {


  render() {
      const follows = this.props.follows.map((follow, id)=>{
        console.log('test')
        return (
            <CollectionItem key={id} style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                    <h5 className="title">
                        {follow.name}
                    </h5>
                    <Link to={`/profile/${follow.id}`}><p>Profile</p></Link>
                </div>
                {this.props.follows.filter(e => e.id === follow.id).length > 0? //look if there is a the same id in the props follows state
                    <Button
                        onClick={()=>this.props.unFollow(follow.id, this.props.user.id)}
                    >
                        UNFOLLOW
                    </Button>
                :
                    <Button
                        onClick={()=>this.props.addFollow(follow.id, this.props.user.id)}
                    >
                        FOLLOW
                    </Button>
                }
            </CollectionItem>
        )
      })
    return (
      <div className='container'>
      <h2>Follows</h2>
      {this.props.isPending?
        <Preloader className='preloader' size="big"/>
      :
      this.props.follows.length?
        <Row>
            <Col m={12} s={12}>
                <Collection>
                    {follows}
                </Collection>
            </Col>
        </Row>
        :
        <p>Start following people by clicking on their names on books review's pages</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state =>{
    return{
        follows: state.follow.follows,
        user: state.Authentication.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Follows)
