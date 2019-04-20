
const initialState = {
    follows:[],
    followers:[],
    oneFollow:[]
}

export const follow = (state=initialState, action={}) =>{
    switch(action.type){
        case 'ADD_FOLLOW_SUCCESS':
            return{...state, follows:action.payload}
        case 'GET_FOLLOWS_SUCCESS':
            return{...state, follows:action.payload}
        case 'GET_FOLLOWERS_SUCCESS':
            return{...state, followers:action.payload}
        case 'UNFOLLOW_SUCCESS':
            return{...state, follows:action.payload}
        case 'ON_SIGNOUT_RESET_FOLLOW':
            return{...state, follows:[], followers:[]}
        default:
            return state
    }
}