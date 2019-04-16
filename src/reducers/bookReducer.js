import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED 
} from '../constants'

const initialStateSearch = {
	input:'',
}


export const searchChange = (state=initialStateSearch, action={}) =>{
	console.log(action)
	switch(action.type){
		case ON_SEARCH_CHANGE:
			return Object.assign({}, state, {input:action.payload})
		default:
			return state
	}	
}


const initialStateBook = {
	bookList:'',
	isPending: false,
	error: '',
	search:''
}

export const onSubmitBook = (state=initialStateBook, action={})=>{
	switch(action.type){
		case REQUEST_BOOK_PENDING:
			return Object.assign({}, state, {isPending:true })
		case REQUEST_BOOK_SUCCESS:
			return Object.assign({}, state, {bookList:action.payload.data, isPending:false, search:action.payload.search})
		case REQUEST_BOOK_FAILED:
			return Object.assign({}, state, {error:action.payload.data, isPending:false})
		case 'ON_RESET_BOOK':
			return {...state, bookList:''}
		default:
		return state
	}
}


const initialStateAddBook = {
	isPending: false,
	isPendingBookReading: false,
	isError: false,
	isSuccess:false,
	error:'',
	bookList:[],
	bookListReading:[],
	isShowingNotification:false
}

export const userBookList = (state = initialStateAddBook, action={})=>{
	switch(action.type){
		// BOOK IN THE TO READ LIST
		case 'ADD_BOOK_PENDING':
			return {...state, isPending:true, isError:false}
		case 'ADD_BOOK_SUCCESS':
			return{...state, isPending:false, isError:false, isSuccess:true, bookList:action.payload}
		case 'ADD_BOOK_FAIL':
			return{...state, isPending:false, isError:true, isSuccess:false}
		case 'HIDE_NOTIFICATION':
			return {...state, isError:false, isSuccess:false}
		case 'GET_USER_BOOKLIST_PENDING':
			return {...state, isPending:true}
		case 'GET_USER_BOOKLIST_SUCCESS':
			return{...state, bookList:action.payload, isError:false, isPending:false}
		case 'DEL_BOOK_SUCCESS_SHOW':
			return{...state, isError:false, isShowingNotification:true, isSuccess:false, isPending:false, bookList:state.bookList.filter(book =>{
				return book.bookid !== action.payload
			})}
		case 'DEL_BOOK_SUCCESS_HIDE':
			return{...state, isShowingNotification:false}

		// BOOK IN THE READING LIST
		case 'ADD_BOOK_READING_PENDING':
			return {...state, isPendingBookReading:true, isError:false}
		case 'ADD_BOOK_READING_SUCCESS':
			return{...state, isPendingBookReading:false, isError:false, isSuccess:true, bookListReading:action.payload}
		case 'ADD_BOOK_READING_FAIL':
			return{...state, isPendingBookReading:false, isError:true, isSuccess:false}
		case 'HIDE_NOTIFICATION_READING':
			return {...state, isError:false, isSuccess:false, isShowingNotification:false}
		
		case 'GET_USER_BOOKLIST_READUING_PENDING':
			return {...state, isPendingBookReading:true}
		case 'GET_USER_BOOKLIST_READING_SUCCESS':
			return{...state, bookListReading:action.payload, isError:false, isPendingBookReading:false}
		
		case 'DEL_BOOK_READING_SUCCESS_SHOW':
			return{...state, isError:false, isShowingNotification:true, isSuccess:false, isPendingReading:false, bookListReading:state.bookListReading.filter(book =>{
				return book.bookid !== action.payload
			})}
		case 'DEL_BOOK_READING_SUCCESS_HIDE':
			return{...state, isShowingNotification:false, isSuccess:false, isError:false}
			

		default:
			return state
	}
}

const initialBookById = {
	book:{},
	isPending: true,
	err: false
}

export const requestBookById = (state=initialBookById, action={}) => {
	switch(action.type){
		case 'REQUEST_BOOKID_PENDING':
			return{...state, isPending:true}
		case 'REQUEST_BOOKID_SUCCESS':
			return{...state, isPending:false, err:false, book:action.payload}
		case 'REQUEST_BOOKID_FAIL':
			return{...state, isPending:false, err:true}
		default:
			return state
	}
}
