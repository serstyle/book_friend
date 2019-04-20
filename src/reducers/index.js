import { combineReducers } from 'redux'
import {searchChange, onSubmitBook, userBookList, requestBookById} from './bookReducer'
import {Authentication} from './authReducer'
import {reviewsBook, getAllReviews} from './reviewsReducer'
import {follow} from './followReducer'

export default combineReducers({searchChange, onSubmitBook, Authentication, userBookList, requestBookById, reviewsBook, follow, getAllReviews})