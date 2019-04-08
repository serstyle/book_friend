const initialStateAuthentication = {
	isAuthenticate: false,
	user:null
}


export const Authentication = (state=initialStateAuthentication, action={}) =>{
	console.log(action)
	switch(action.type){
		case 'AUTHENTICATION_SUCCESS':
			return {...state, isAuthenticate:true, user:action.payload}
		case 'LOGOUT_SUCCESS':
			return {...state, isAuthenticate:false, user:null}
		default:
			return state
	}	
}