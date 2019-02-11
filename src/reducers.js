import { ON_SEARCH_CHANGE, 
	REQUEST_BOOK_PENDING, 
	REQUEST_BOOK_SUCCESS, 
	REQUEST_BOOK_FAILED 
} from './constants'

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
	error: ''
}

export const onSubmitBook = (state=initialStateBook, action={})=>{
	switch(action.type){
		case REQUEST_BOOK_PENDING:
			return Object.assign({}, state, {isPending:true })
		case REQUEST_BOOK_SUCCESS:
			return Object.assign({}, state, {bookList:action.payload, isPending:false})
		case REQUEST_BOOK_FAILED:
			return Object.assign({}, state, {error:action.payload, isPending:false})
		default:
		return state
	}
}