import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED 
} from './constants'


export const setSearchChange = (text) =>({
	type: ON_SEARCH_CHANGE,
	payload: text
})


export const onSubmitBook = () => (dispatch, getState) => {
	dispatch({type:REQUEST_BOOK_PENDING})
	fetch("https://www.googleapis.com/books/v1/volumes?q=" + getState().searchChange.input) //getstate to take a state from an other reducer
    .then(res => res.json())
    .then(data => dispatch({type:REQUEST_BOOK_SUCCESS, payload:data.items}))
    .catch(err => dispatch({type:REQUEST_BOOK_FAILED, payload:err}))
}