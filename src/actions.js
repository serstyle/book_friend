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
	fetch("https://www.googleapis.com/books/v1/volumes?q=" + getState().searchChange.input + '&maxResults=10') //getstate to take a state from an other reducer
    .then(res => res.json())
    .then(data => {dispatch({type:REQUEST_BOOK_SUCCESS, payload:data.items}) 
    	console.log(data)})
    .catch(err => dispatch({type:REQUEST_BOOK_FAILED, payload:err}))
}

export const resetBookList = () =>({
	type: 'ON_RESET_BOOK',
})

export const authSignin = (user) => ({
	type: 'AUTHENTICATION_SUCCESS',
	payload: user
})

export const authRegister = (user) => ({
	type: 'AUTHENTICATION_SUCCESS',
	payload: user
})

export const authSignout = () => ({
	type: 'LOGOUT_SUCCESS'
})

export const onRouteChange = (route) => ({
	type: 'ON_ROUTE_CHANGE',
	payload: route
})