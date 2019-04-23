import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {Icon, Button, Row, Col, Preloader} from 'react-materialize'
import {getFollowers, getFollows, addFollow, unFollow} from '../../actions'
import OtherLastReviews from './OtherLastReviews/OtherLastReviews'
import OtherBookList from './OtherBookList/OtherBookList'

class OtherProfile extends React.Component {
    //state is for others users and props for the current user
    state={
        name:'',
        isError:false,
        follows:0,
        followers:0
    }
    addFollow = () => {
        this.props.addFollow(this.props.match.params.id, this.props.user.id)
        this.setState(prevState => ({
            followers: prevState.followers+1
        }))
    }
    unFollow = () => {
        this.props.unFollow(this.props.match.params.id, this.props.user.id)
        this.setState(prevState => ({
            followers: prevState.followers-1
        }))
    }
    getFollowsAndFollowers = (id) =>{
        this.props.getFollowers(id)
        this.props.getFollows(id)

    }
    componentDidMount(){
        const id = this.props.match.params.id
        fetch(`${process.env.REACT_APP_DOMAIN}otherprofile`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            data === 'err'?
            this.setState({isError:true})
            :
            this.setState({
                name:data.data.name,
                follows:data.follows.length,
                followers:data.followers.length
            })
        })
        .catch(err=> this.setState({isError:true}))
    }
    componentDidUpdate(prevProps){
        const id = this.props.match.params.id
        if(prevProps.match.params.id !== id){
            console.log('trigger')
            fetch(`${process.env.REACT_APP_DOMAIN}otherprofile`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                data === 'err'?
                this.setState({isError:true})
                :
                this.setState({
                    name:data.data.name,
                    follows:data.follows.length,
                    followers:data.followers.length
                })
            })
            .catch(err=> this.setState({isError:true}))
        }
    }
    render(){
        const id = this.props.match.params.id
        return (
            <div className='container'>
                {this.props.isLoading ?
                    <Preloader className='preloader' size="big"/>
                    :
                    this.state.isError || !this.props.isAuthenticate?
                    <Redirect to='/' />
                    :
                    <div>
                        <h4 className='center-align' >
                        {this.props.user.id.toString() === id?
                            `Welcome ${this.props.user.name}`
                            :
                            `Welcome on the ${this.state.name}'s Profile`
                        }
                        </h4>
                        <hr style={{margin:'3rem'}} />
                        <Row style={{flexDirection:'row-reverse'}}>
                        <Col s={12} m={6} className='right-align'>
                            {this.props.user.id.toString() === id?
                                null
                                :
                                <div>
                                {this.props.follow.follows.filter(e => e.id.toString() === id).length > 0? //look if there is a the same id in the props follows state
                                    <Button
                                        onClick={this.props.follow.isTriggerFollowPending?null:this.unFollow}
                                    >
                                        UNFOLLOW
                                    </Button>
                                :
                                    <Button
                                        onClick={this.props.follow.isTriggerFollowPending?null:this.addFollow}
                                    >
                                        FOLLOW
                                    </Button>
                                }
                                </div>
                                }
                            {this.props.user.id.toString() === id?
                                <div style={{display:'flex', flexDirection:'column'}}>
                                <Link to={`/profile/${id}/follows`}>Follows {this.props.follow.follows.length}</Link>
                                <Link to={`/profile/${id}/followers`}>Followers {this.props.follow.followers.length}</Link>
                                </div>
                            :
                                <div>
                                <p>Follows {this.state.follows}</p>
                                <p>Followers {this.state.followers}</p>
                                </div>
                            }
                        </Col>
                        <Col s={12} m={6}>
                        {this.props.user.id.toString() === id?
                            <Link to='/profile'>
                                <Button 
                                    style={{display:'flex', paddingLeft: '10px'}}
                                >
                                    <Icon>
                                        settings
                                    </Icon>
                                    <span className='button-text-smaller'style={{marginLeft: '5px'}}>Manage your booklists</span>
                                </Button>
                            </Link>                        
                            :
                            null
                        }
                        </Col>
                        </Row>
                        <Row>
                            <Col s={12} m={12} l={6} className='otherProfileDiv'>
                                <OtherBookList id={id}/>
                            </Col>
                            <Col s={12} m={12} l={6} className='otherProfileDiv'>
                                <OtherLastReviews title={this.props.user.id.toString() === id?'Your last reviews':this.state.name + "'s last reviews"} id={id}/>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
            
    }
}

const mapStateToProps = state =>{
    return{
        user:state.Authentication.user,
        isLoading:state.Authentication.isLoading,
        isAuthenticate:state.Authentication.isAuthenticate,
        follow: state.follow
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getFollows: (follow_by_id) => dispatch(getFollows(follow_by_id)),
        getFollowers: (user_id) => dispatch(getFollowers(user_id)),
        addFollow: (user_id, follow_by_id) => dispatch(addFollow(user_id, follow_by_id)),
        unFollow: (user_id, follow_by_id) => dispatch(unFollow(user_id, follow_by_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);