import React from 'react'
import {connect} from 'react-redux'

class BookReview extends React.Component{

    render(){
        const reviews = 
            this.props.isGetPending?
                null
                :
                this.props.reviews.length?
                this.props.reviews.map((review, id) => {
                return(
                        <tr key={id}>
                            <td>
                                {review.email}
                            </td>
                            <td>
                                {review.review}
                            </td>
                            <td>
                                {review.note}
                            </td>
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
        reviews: state.reviewsBook.reviews
    }
}

export default connect(mapStateToProps)(BookReview)