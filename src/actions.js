import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED,
	LOGIN_SUCCESS
} from './constants'

// prod process.env.REACT_APP_DOMAIN = 'https://bookfriends-server.herokuapp.com/'

//books
export const setSearchChange = (text) =>({
	type: ON_SEARCH_CHANGE,
	payload: text
})


export const onSubmitBook = () => (dispatch, getState) => {
	dispatch({type:REQUEST_BOOK_PENDING})
	fetch("https://www.googleapis.com/books/v1/volumes?q=" + getState().searchChange.input + '&maxResults=10') //getstate to take a state from an other reducer
    .then(res => res.json())
    .then(data => {dispatch({type:REQUEST_BOOK_SUCCESS, payload:{data:data.items, search:getState().searchChange.input}}) 
    	console.log(data)})
    .catch(err => dispatch({type:REQUEST_BOOK_FAILED, payload:err}))
}

export const onSubmitBookById = (bookid) => (dispatch) => {
	dispatch({type:'REQUEST_BOOKID_PENDING'})
	fetch(`https://www.googleapis.com/books/v1/volumes/${bookid}`) //getstate to take a state from an other reducer
    .then(res => res.json())
    .then(data => {
			if(data.error){
				dispatch({type:'REQUEST_BOOKID_FAIL'})
			}else{
				dispatch({type:'REQUEST_BOOKID_SUCCESS', payload:data})
			}
		})
    .catch(err => dispatch({type:'REQUEST_BOOKID_FAIL', payload:err}))
}

export const resetBookList = () =>({
	type: 'ON_RESET_BOOK',
})
//book toread
//add a book to the db book to read
export const addBook = (book) => (dispatch, getState) => {
	const email = getState().Authentication.user.email;
	const token = localStorage.getItem('token')
	const description = book.description.length > 40 ? book.description.substring(0, 40) + '...' : book.description;
	dispatch({type:'ADD_BOOK_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}addbook`, {
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

//get the user s booklist to read

const getUserBookList = (email, token) => (dispatch, getState) => {
	dispatch({type:'GET_USER_BOOKLIST_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}getbook`, {
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
	fetch(`${process.env.REACT_APP_DOMAIN}delbook`, {
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

//book reading
export const addBookReading = (book) => (dispatch, getState) => {
	const email = getState().Authentication.user.email;
	const token = localStorage.getItem('token')
	const description = book.description.length > 40 ? book.description.substring(0, 40) + '...' : book.description;
	dispatch({type:'ADD_BOOK_READING_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}addbookreading`, {
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
			dispatch({type:'ADD_BOOK_READING_FAIL'})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION_READING' })
			}, 3000)
		}
		else {
			dispatch(getUserBookList(email, token))
			dispatch({type:'ADD_BOOK_READING_SUCCESS', payload:data})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION_READING' })
			}, 3000)
		}
	})
}

//get the user s booklist to read

const getUserBookListReading = (email, token) => (dispatch, getState) => {
	dispatch({type:'GET_USER_BOOKLIST_READING_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}getbookreading`, {
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
		dispatch({type:'GET_USER_BOOKLIST_READING_SUCCESS', payload: data})
	})
}

//del a book in the booklist reading

export const delBookReading = (bookid) => (dispatch, getState) => {
	fetch(`${process.env.REACT_APP_DOMAIN}delbookreading`, {
		method:'POST',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		body: JSON.stringify({email: getState().Authentication.user.email,bookid})
	})
	.then(res => res.json())
	.then(data => {
		dispatch({type:'DEL_BOOK_READING_SUCCESS_SHOW', payload:bookid})
		setTimeout(() => {
			dispatch({ type: 'DEL_BOOK_READING_SUCCESS_HIDE' })
		}, 3000)
	})
}

//book finish
export const addBookFinish = (book) => (dispatch, getState) => {
	const email = getState().Authentication.user.email;
	const token = localStorage.getItem('token')
	const description = book.description.length > 40 ? book.description.substring(0, 40) + '...' : book.description;
	dispatch({type:'ADD_BOOK_FINISH_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}addbookfinish`, {
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
			dispatch({type:'ADD_BOOK_FINISH_FAIL'})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION_FINISH' })
			}, 3000)
		}
		else {
			dispatch(getUserBookListReading(email, token))
			dispatch({type:'ADD_BOOK_FINISH_SUCCESS', payload:data})
			setTimeout(() => {
				dispatch({ type: 'HIDE_NOTIFICATION_FINISH' })
			}, 3000)
		}
	})
}

//get the user s booklist finish

const getUserBookListFinish = (email, token) => (dispatch, getState) => {
	dispatch({type:'GET_USER_BOOKLIST_FINISH_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}getbookfinish`, {
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
		dispatch({type:'GET_USER_BOOKLIST_FINISH_SUCCESS', payload: data})
	})
}

//del a book in the booklist finish

export const delBookFinish = (bookid) => (dispatch, getState) => {
	fetch(`${process.env.REACT_APP_DOMAIN}delbookfinish`, {
		method:'POST',
		headers:{
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('token')
		},
		body: JSON.stringify({email: getState().Authentication.user.email,bookid})
	})
	.then(res => res.json())
	.then(data => {
		dispatch({type:'DEL_BOOK_FINISH_SUCCESS_SHOW', payload:bookid})
		setTimeout(() => {
			dispatch({ type: 'DEL_BOOK_FINISH_SUCCESS_HIDE' })
		}, 3000)
	})
}

//auth

//   //Loggin
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,

export const authSignin = (user) => (dispatch) => {
	fetch(`${process.env.REACT_APP_DOMAIN}signin`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({email:user.email, hash:user.password})
	})
	.then(res=> res.json())
	.then(data=> {
			const token = data.token;
			fetch(`${process.env.REACT_APP_DOMAIN}profile`, {
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
				dispatch(getUserBookListReading(data.email, token))
				dispatch(getUserBookListFinish(data.email, token))
				dispatch(getFollows(data.id, token))
				dispatch(getFollowers(data.id, token))
				dispatch(getAllReviews(data.id, token))
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
	fetch(`${process.env.REACT_APP_DOMAIN}profile`, {
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
		dispatch(getUserBookListReading(data.email))
		dispatch(getUserBookListFinish(data.email))
		dispatch(getFollows(data.id))
		dispatch(getFollowers(data.id))
		dispatch(getAllReviews(data.id))
		dispatch({type:'USER_LOADED', payload: data })
		console.log(data)
	})
	.catch(err => dispatch({type:'AUTH_ERROR', payload:'wrong credentials'}))
}

//   //Logout

export const logout = () => (dispatch, getState) =>{
	const token = localStorage.getItem('token');
	dispatch({type:'LOGOUT_PENDING'}) // need to be done 
	fetch(`${process.env.REACT_APP_DOMAIN}signout`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token
		}
	})
	.then(res => res.json())
	.then(data => {
		dispatch({type:'ON_SIGNOUT_RESET_FOLLOW'})
		dispatch({type:'LOGOUT_SUCCESS'})})
	.catch(err=>console.log(err))
}

//   //register
//   REGISTER_SUCCESS,
//   REGISTER_FAIL

export const authRegister = (user) => (dispatch) => (
	fetch(`${process.env.REACT_APP_DOMAIN}register`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({email:user.email, hash:user.password, name:user.name})
	})
	.then(res=> res.json())
	.then(data=> {
			const token = data.token;
			fetch(`${process.env.REACT_APP_DOMAIN}profile`, {
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
	fetch(`${process.env.REACT_APP_DOMAIN}updateprofile`, {
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

export const addReview = (data) => (dispatch) => {
	const token = localStorage.getItem('token');
	const {bookid, userid, note, review, booktitle} = data
	dispatch({type:'ADD_REVIEW_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}addreview`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : token
		},
		body: JSON.stringify({bookid, userid, note, review, booktitle})
	})
	.then(res=> res.json())
	.then(data =>{
		dispatch(getReviews(bookid))
		dispatch({type:'ADD_REVIEW_SUCCESS', payload:data})
		setTimeout(()=>{
			dispatch({type:'ADD_REVIEW_HIDE_NOTIF'})
		}, 3000)
	})
	.catch(err => dispatch({type:'ADD_REVIEW_FAILED'}))
}

export const getReviews = (bookid) => (dispatch) => {
	console.log(bookid)
	dispatch({type:'GET_REVIEWS_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}getreview`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({bookid})
	})
	.then(res=> res.json())
	.then(data => {
		dispatch({type:'GET_REVIEWS_SUCCESS', payload:data})
	})
	.catch(err => dispatch({type:'GET_REVIEWS_FAILED', payload:err}))
}

export const addReviewToggleContainer = dispatch => ({
	type: 'ADD_REVIEW_TOGGLE_CONTAINER'
})

export const delReview = (reviewid, email) => (dispatch) => {
	const token = localStorage.getItem('token');
	dispatch({type:'DEL_REVIEW_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}delreview`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : token
		},
		body: JSON.stringify({reviewid, email})
	})
	.then(res => res.json())
	.then(data => {
		dispatch({type:'DEL_REVIEW_SUCCESS', payload:data})
		setTimeout(()=>{
			dispatch({type:'DEL_REVIEW_HIDE_NOTIF'})
		}, 3000)
	})
}

//FOLLOW / FOLLOWER

export const addFollow = (user_id, follow_by_id) => dispatch =>{
	fetch(`${process.env.REACT_APP_DOMAIN}follow/addfollow`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : localStorage.getItem('token')
		},
		body: JSON.stringify({user_id, follow_by_id})
	})
	.then(res=>res.json())
	.then(data => {
		dispatch({type:'ADD_FOLLOW_SUCCESS', payload:data})
	})
}

export const getFollows = (follow_by_id, token) => dispatch =>{
	fetch(`${process.env.REACT_APP_DOMAIN}follow/getfollows`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : token || localStorage.getItem('token')
		},
		body: JSON.stringify({follow_by_id})
	})
	.then(res=>res.json())
	.then(data => {
		dispatch({type:'GET_FOLLOWS_SUCCESS', payload:data})
	})
}

export const getFollowers = (user_id, token) => dispatch =>{
	fetch(`${process.env.REACT_APP_DOMAIN}follow/getfollowers`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : token || localStorage.getItem('token')
		},
		body: JSON.stringify({user_id})
	})
	.then(res=>res.json())
	.then(data => {
		dispatch({type:'GET_FOLLOWERS_SUCCESS', payload:data})
	})
}

export const unFollow = (user_id, follow_by_id) => dispatch =>{
	fetch(`${process.env.REACT_APP_DOMAIN}follow/unfollow`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : localStorage.getItem('token')
		},
		body: JSON.stringify({user_id, follow_by_id})
	})
	.then(res=>res.json())
	.then(data => {
		dispatch({type:'UNFOLLOW_SUCCESS', payload:data})
	})
}

export const getAllReviews = (id, token) => dispatch => {
	dispatch({type:'GET_ALL_REVIEWS_PENDING'})
	fetch(`${process.env.REACT_APP_DOMAIN}getallreviews`, {
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : token || localStorage.getItem('token')
		},
		body: JSON.stringify({id})
	})		
	.then(res=>res.json())
	.then(data=>{
		dispatch({type:'GET_ALL_REVIEWS_SUCCESS', payload:data})
	})
}