import { combineReducers } from 'redux'
import {searchChange, onSubmitBook, userBookList, requestBookById} from './bookReducer'
import {Authentication} from './authReducer'
import {onRouteChange} from './routeReducer'

export default combineReducers({searchChange, onSubmitBook, Authentication, onRouteChange, userBookList, requestBookById})