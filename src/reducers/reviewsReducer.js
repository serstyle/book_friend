const initialReviewsState = {
    isAddPending:false,
    isGetPending:true,
    isDelPending:false,
    isError:false,
    reviews:[],
    err: '',
    isSuccess: false,
    isDelSuccess: false,
    note:0,
    isOpen:false
}

var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export const reviewsBook = (state=initialReviewsState, action={}) =>{
    switch(action.type){
        case 'ADD_REVIEW_PENDING':
            return {...state, isAddPending:true}
        case 'ADD_REVIEW_SUCCESS':
            return {...state, isPending:false, isDelSuccess:false, isSuccess: true, reviews:[...state.reviews, action.payload], note:average([...state.reviews, action.payload].map(review => review.note)).toFixed(1)}
        case 'ADD_REVIEW_HIDE_NOTIF':
            return{...state, isSuccess:false}
        case 'ADD_REVIEW_TOGGLE_CONTAINER':
            return{...state, isOpen:!state.isOpen}
        case 'ADD_REVIEW_FAILED':
            return {...state, isPending:false, isError:true}
        case 'GET_REVIEWS_PENDING':
            return {...state, isGetPending:true}
        case 'GET_REVIEWS_SUCCESS':
            return {...state, isGetPending:false,  reviews:action.payload, note:average(action.payload.map(review => review.note)).toFixed(1) }
        case 'GET_REVIEWS_FAILED':
            return {...state, isGetPending:false, isError:true, err:action.payload}

        case 'DEL_REVIEW_PENDING':
            return {...state, isDelPending:true}
        case 'DEL_REVIEW_SUCCESS':
            return{...state, isDelPending:false, isDelSuccess:true, isSuccess:false, reviews: state.reviews.filter(review =>{
                return review.id !== action.payload
            })}
        case 'DEL_REVIEW_HIDE_NOTIF':
            return{...state, isDelSuccess:false}
        default:
        return state
    }
}

const initStateAllReviews = {
    reviews:[],
    isPending:true
}

export const getAllReviews = (state=initStateAllReviews, action={})=>{
    switch(action.type){
        case 'GET_ALL_REVIEWS_PENDING':
            return{...state, isPending:true}
        case 'GET_ALL_REVIEWS_SUCCESS':
            return{...state, reviews:action.payload, isPending:false}
        default:
        return state    
    }
}