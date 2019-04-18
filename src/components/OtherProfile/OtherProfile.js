import React from 'react'
import OtherLastReviews from './OtherLastReviews/OtherLastReviews'
import OtherBookList from './OtherBookList/OtherBookList'

class OtherProfile extends React.Component {
    state={
        name:''
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        fetch('http://localhost:3000/otherprofile', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => this.setState({name:data.name}))
    }
    render(){
        const id = this.props.match.params.id
        return(
            <div className='container'>
                <h4 className='center-align'>Welcome on the {this.state.name}'s Profile</h4>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <OtherBookList id={id}/>
                    <OtherLastReviews title={'Last reviews'} id={id}/>
                </div>
            </div>
        )
    }
}

export default OtherProfile;