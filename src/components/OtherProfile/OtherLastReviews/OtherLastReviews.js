import React from 'react'
import {Link} from 'react-router-dom'

class OtherLastReviews extends React.Component {
    state={
        reviews:[],
        isPending:true
    }
    componentDidMount(){
        const id = this.props.id
        this.props.reviews?
        this.setState({reviews:this.props.reviews, isPending:false})
        :
        fetch(`${process.env.REACT_APP_DOMAIN}otherprofile/reviews`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => this.setState({reviews:data, isPending:false}))
    }
    componentDidUpdate(prevProps){
        const id = this.props.id
        if(prevProps.id !== id){
            this.setState({isPending:true})
            console.log('trigger')
            fetch(`${process.env.REACT_APP_DOMAIN}otherprofile/reviews`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => this.setState({reviews:data, isPending:false}))
        }
    }
    render(){
        const reviews = !this.state.reviews.length?null:
            this.state.reviews.map(review =>{
                let booktitle = review.booktitle.length > 20?
                review.booktitle.substring(0, 20) + '...'
                :
                review.booktitle
                return(
                    <tr key={review.id}>
                        {this.props.reviews?
                        <td>
                            <Link to={`/profile/${review.userid}`}>
                                {
                                    review.userid === this.props.user.id?
                                    <span>{review.name}<span className='discret'> (YOU)</span></span>
                                    :
                                    review.name
                                }
                                </Link>
                        </td>
                        :
                        null
                        }
                        <td><Link to={`/book/${review.bookid}`}>{booktitle}</Link></td>
                        <td>{review.review}</td>
                        <td>{review.note}</td>
                    </tr>
                )
            })
        return this.state.isPending?
            <p>...</p>
        :
            <div>
                <h5>{this.props.title}</h5>
                {this.state.reviews.length?
                <table>
                    <thead>
                        <tr>
                            {this.props.reviews?
                            <th>Author</th>
                            :
                            null
                            }
                            <th>Book</th>
                            <th>Review</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews}
                    </tbody>
                </table>
                :
                <p className='discret'>There are no reviews for now</p>
                }
            </div>
    }
}

export default OtherLastReviews;