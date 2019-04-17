import React from 'react'
import {connect} from 'react-redux'
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
                                {review.email}
                            </td>
                            <td>
                                {review.review}
                            </td>
                            <td>
                                {review.note}
                            </td>
                            {review.email === this.props.user.email?
                                <td>
                                    <button onClick={()=>this.props.delReview(review.id, this.props.user.email)} className='btn red'>X</button>
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
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews}
                    </tbody>
                </table>
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