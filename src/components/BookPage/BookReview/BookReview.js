import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {delReview} from '../../../actions'

class BookReview extends React.Component{

    render(){
        const reviews = 
            this.props.isGetPending?
                null
                :
                this.props.reviews.length?
                this.props.reviews.map((review, id) => {
                return(
                        <tr id={review.id} key={review.id}>
                            <td>
                                <Link to={`/profile/${review.userid}`}>{review.name}</Link>
                            </td>
                            <td>
                                {review.review}
                            </td>
                            <td>
                                {review.note}
                            </td>
                            {review.userid === this.props.user.id?
                                <td style={{borderBottom: '1px solid rgb(255, 255, 255)'}}>
                                    <button onClick={()=>this.props.delReview(review.id, this.props.user.email)} className='btn btn-small red'>X</button>
                                </td>
                            
                            :
                            null
                            }
                        </tr>
                )
                })
                :
                null
        return(
            <div>
                <h4>Reviews : </h4>
                <table>
                    <thead>
                        <tr>
                            <th>Authors</th>
                            <th>Comments</th>
                            <th>Evaluations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews}
                    </tbody>
                </table>
                {this.props.reviews.length?null:<p style={{color:'lightgrey', fontStyle:'italic'}}>Be the first to add a review...</p>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        isGetPending: state.reviewsBook.isGetPending,
        reviews: state.reviewsBook.reviews,
        user:state.Authentication.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        delReview: (reviewid, email) => dispatch(delReview(reviewid, email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookReview)