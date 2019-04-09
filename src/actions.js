import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED,
	LOGIN_SUCCESS
} from './constants'

//books
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



export const authRegister = (user) => ({
	type: 'AUTHENTICATION_SUCCESS',
	payload: user
})



//get the route
export const onRouteChange = (route) => ({
	type: 'ON_ROUTE_CHANGE',
	payload: route
})


//auth


//   //Loggin
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,

export const authSignin = (user) => (dispatch) => {
	fetch('http://localhost:3000/signin', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({email:user.email, hash:user.password})
	})
	.then(res=> res.json())
	.then(data=> {
			const token = data.token;
			fetch('http://localhost:3000/profile', {
				method:'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': data.token
				}
			})
			.then(res=> res.json())
			.then(data => {
				if(data === 'unauthorized'){
					return dispatch({type:'LOGIN_FAIL', payload:'wrong credentials'})
				}
				dispatch({type:LOGIN_SUCCESS, payload: {data, token} })
				console.log(data)
			})
			.catch(err => dispatch({type:'LOGIN_FAIL', payload:'wrong credentials'}))
		})
	
}


// //LOAD THE USER   ?

export const loadUser = () => (dispatch) =>{
	const token = localStorage.getItem('token')
	dispatch({type:'USER_LOADING'});
	fetch('http://localhost:3000/profile', {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(res=> res.json())
	.then(data => {
		if(data === 'unauthorized'){
			return dispatch({type:'AUTH_ERROR', payload:'wrong credentials'})
		}
		dispatch({type:'USER_LOADED', payload: data })
		console.log(data)
	})
	.catch(err => dispatch({type:'AUTH_ERROR', payload:'wrong credentials'}))
}

//   //Logout

export const logout = () => (dispatch, getState) =>{
	const token = localStorage.getItem('token');
	fetch('http://localhost:3000/signout', {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(res => res.json())
	.then(data => dispatch({type:'LOGOUT_SUCCESS'}))
	.catch(err=>console.log(err))
}

//   //register
//   REGISTER_SUCCESS,
//   REGISTER_FAIL