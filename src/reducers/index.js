import { combineReducers } from 'redux'
import {searchChange, onSubmitBook, userBookList, requestBookById} from './bookReducer'
import {Authentication} from './authReducer'
import {reviewsBook} from './reviewsReducer'

export default combineReducers({searchChange, onSubmitBook, Authentication, userBookList, requestBookById, reviewsBook})