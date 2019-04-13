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

export const onSubmitBookById = (bookid) => (dispatch) => {
	dispatch({type:'REQUEST_BOOKID_PENDING'})
	fetch(`https://www.googleapis.com/books/v1/volumes/${bookid}`) //getstate to take a state from an other reducer
    .then(res => res.json())
    .then(data => {dispatch({type:'REQUEST_BOOKID_SUCCESS', payload:data}) 
    	console.log(data)})
    .catch(err => dispatch({type:'REQUEST_BOOKID_FAIL', payload:err}))
}

export const resetBookList = () =>({
	type: 'ON_RESET_BOOK',
})

//add a book to the db 
export const addBook = (book) => (dispatch, getState) => {
	const email = getState().Authentication.user.email;
	const token = localStorage.getItem('token')
	const description = book.description.length > 40 ? book.description.substring(0, 40) + '...' : book.description;
	dispatch({type:'ADD_BOOK_PENDING'})
	fetch("http://localhost:3000/addbook", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({
			email, 
			bookID:book.bookid,
			title:book.title, 
			authors:book.authors, 
			description:description
		})
	})
	.then(res => res.json())
	.then(data => {
		if(data === 'too much book'){
			dispatch({type:'ADD_BOOK_FAIL'})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION' })
			}, 3000)
		}
		else {
			dispatch({type:'ADD_BOOK_SUCCESS', payload:data})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION' })
			}, 3000)
		}
	})
}
//get book from bookid : https://www.googleapis.com/books/v1/volumes/

//get the user s booklist

const getUserBookList = (email, token) => (dispatch, getState) => {
	dispatch({type:'GET_USER_BOOKLIST_PENDING'})
	fetch('http://localhost:3000/getbook', {
		method: 'POST',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': token || localStorage.getItem('token')
		},
		body: JSON.stringify({email})
	})
	.then(res => res.json())
	.then(data => {
		console.log('booklist :', data)
		dispatch({type:'GET_USER_BOOKLIST_SUCCESS', payload: data})
	})
}

//del a book 

export const delBook = (bookid) => (dispatch, getState) => {
	fetch('http://localhost:3000/delbook', {
		method:'POST',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		body: JSON.stringify({email: getState().Authentication.user.email,bookid})
	})
	.then(res => res.json())
	.then(data => {
		dispatch({type:'DEL_BOOK_SUCCESS_SHOW', payload:bookid})
		setTimeout(() => {
			dispatch({ type: 'DEL_BOOK_SUCCESS_HIDE' })
		}, 3000)
	})
}


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
				dispatch(getUserBookList(data.email, token))
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
		dispatch(getUserBookList(data.email))
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

export const authRegister = (user) => (dispatch) => (
	fetch('http://localhost:3000/register', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({email:user.email, hash:user.password, name:user.name})
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
					return dispatch({type:'REGISTER_FAIL', payload:'wrong credentials'})
				}
				dispatch({type:'REGISTER_SUCCESS', payload: {data, token} })
				console.log(data)
			})
			.catch(err => dispatch({type:'REGISTER_FAIL', payload:'wrong credentials'}))
		})
	 
)


export const updateUser = (user) => (dispatch, getState) => {
	const token = localStorage.getItem('token');
	let {email, name, age, city} = user;
	if(!name.length){
		name = getState().Authentication.user.name
	}
	if(!age.length){
		age = getState().Authentication.user.age
	}
	if(!city.length){
		city = getState().Authentication.user.city
	}
	fetch('http://localhost:3000/updateprofile', {
		method:'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		},
		body: JSON.stringify({email, name, age, city})
	})
	.then(res=> res.json())
	.then(data=> dispatch({type:'UPDATE_USER_SUCCESS', payload:data}))
}

export const close_modal = () => ({
	type:'CLOSE_MODAL_SUCCESS'
})