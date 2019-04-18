import React from 'react'
import {Link} from 'react-router-dom'

class OtherLastReviews extends React.Component {
    state={
        reviews:[]
    }
    componentDidMount(){
        const id = this.props.id
        fetch('http://localhost:3000/otherprofile/reviews', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => this.setState({reviews:data}))
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
                        <td><Link to={`/book/${review.bookid}`}>{booktitle}</Link></td>
                        <td>{review.review}</td>
                        <td>{review.note}</td>
                    </tr>
                )
            })
        return(
            <div className='otherProfileDiv lightgrey'>
                <h5>Last Reviews</h5>
                {this.state.reviews.length?
                <table>
                    <thead>
                        <tr>
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
        )
    }
}

export default OtherLastReviews;