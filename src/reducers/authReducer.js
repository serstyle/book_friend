import { 
	LOGIN_SUCCESS
} from '../constants'

const initialStateAuthentication = {
	isAuthenticate: false,
	user:null,
	isLoading:true,
	token: localStorage.getItem('token'),
	isError: false
}


export const Authentication = (state=initialStateAuthentication, action={}) =>{
	console.log(action)
	switch(action.type){
		case 'LOGOUT_PENDING':
		case 'USER_LOADING':
			return {...state, isLoading:true, isError: false}
		case 'USER_LOADED':
			return{...state, isAuthenticate:true, user:action.payload, isLoading:false, isError: false}

		case 'REGISTER_SUCCESS':
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return{...state, isAuthenticate:true, user:action.payload.data, isLoading:false, isError: false}
	
		// case 'AUTHENTICATION_SUCCESS':
		// 	return {...state, isAuthenticate:true, user:action.payload, isError: false}
	
		case 'LOGIN_FAIL':
		case 'REGISTER_FAIL':
			localStorage.removeItem('token');
			return{...state, isAuthenticate:false, user:null, isLoading:false, token:null, isError:true}
		case 'AUTH_ERROR':
		case 'LOGOUT_SUCCESS':
			localStorage.removeItem('token');
			return{...state, isAuthenticate:false, user:null, isLoading:false, token:null, isError:false}

		case 'CLOSE_MODAL_SUCCESS':
			return{...state, isError: false}

		case 'UPDATE_USER_SUCCESS':
			return{...state, user:action.payload}
		default:
			return state
	}	
}