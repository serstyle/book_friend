import { 
	LOGIN_SUCCESS
} from '../constants'

const initialStateAuthentication = {
	isAuthenticate: false,
	user:null,
	isLoading:true,
	token: localStorage.getItem('token')
}


export const Authentication = (state=initialStateAuthentication, action={}) =>{
	console.log(action)
	switch(action.type){
		case 'USER_LOADING':
			return {...state, isLoading:true}
		case 'USER_LOADED':
			return{...state, isAuthenticate:true, user:action.payload, isLoading:false}

		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return{...state, isAuthenticate:true, user:action.payload.data, isLoading:false}
		
		
		
		case 'AUTHENTICATION_SUCCESS':
			return {...state, isAuthenticate:true, user:action.payload}

		case 'AUTH_ERROR':
		case 'LOGIN_FAIL':
		case 'LOGOUT_SUCCESS':
			localStorage.removeItem('token');
			return{...state, isAuthenticate:false, user:null, isLoading:false, token:null}


		default:
			return state
	}	
}