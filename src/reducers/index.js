import { combineReducers } from 'redux'
import {searchChange, onSubmitBook} from './getBooks'
import {Authentication} from './authReducer'
import {onRouteChange} from './routeReducer'

export default combineReducers({searchChange, onSubmitBook, Authentication, onRouteChange})