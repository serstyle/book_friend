import React from 'react'
import {Redirect} from 'react-router-dom'
import OtherLastReviews from './OtherLastReviews/OtherLastReviews'
import OtherBookList from './OtherBookList/OtherBookList'

class OtherProfile extends React.Component {
    state={
        name:'',
        isError:false
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        fetch(`${process.env.REACT_APP_DOMAIN}otherprofile`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => this.setState({name:data.name}))
        .catch(err=> this.setState({isError:true}))
    }
    render(){
        const id = this.props.match.params.id
        return this.state.isError?
            <Redirect to='/' />
            :
            <div className='container'>
                <h4 className='center-align'>Welcome on the {this.state.name}'s Profile</h4>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <OtherBookList id={id}/>
                    <OtherLastReviews title={'Last reviews'} id={id}/>
                </div>
            </div>
            
    }
}

export default OtherProfile;