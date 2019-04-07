const initialState = {
    route:'/'
}


export const onRouteChange = (state=initialState, action={}) =>{
	console.log(action)
	switch(action.type){
		case 'ON_ROUTE_CHANGE':
			return {...state, route:action.payload}
		default:
			return state
	}	
}