import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED 
} from './constants'


export const setSearchChange = (text) =>({
	type: ON_SEARCH_CHANGE,
	payload: text
})


export const onSubmitBook = (fetch) => (dispatch) => {
	dispatch({type:REQUEST_BOOK_PENDING})
	fetch(fetch)
    .then(res => res.json())
    .then(data => ({type:REQUEST_BOOK_SUCCESS, payload:data}))
    .catch(err => ({type:REQUEST_BOOK_FAILED, payload:err}))
}