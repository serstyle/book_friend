
const initialState = {
    follows:[],
    followers:[],
    isPending:true,
    isTriggerFollowPending:false
}

export const follow = (state=initialState, action={}) =>{
    switch(action.type){
        case 'GET_FOLLOWS_PENDING':
        case 'GET_FOLLOWERS_PENDING':
            return{...state, isPending:true}
        case 'TRIGGER_FOLLOW_PENDING':
            return{...state, isTriggerFollowPending:true}
        case 'ADD_FOLLOW_SUCCESS':
            return{...state, follows:action.payload, isTriggerFollowPending:false, isPending:false}
        case 'GET_FOLLOWS_SUCCESS':
            return{...state, follows:action.payload, isPending:false}
        case 'GET_FOLLOWERS_SUCCESS':
            return{...state, followers:action.payload, isPending:false}
        case 'UNFOLLOW_SUCCESS':
            return{...state, follows:action.payload, isTriggerFollowPending:false, isPending:false}
        case 'ON_SIGNOUT_RESET_FOLLOW':
            return{...state, follows:[], followers:[], isPending:false}
        default:
            return state
    }
}