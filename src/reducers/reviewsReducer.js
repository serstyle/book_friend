const initialReviewsState = {
    isAddPending:false,
    isGetPending:true,
    isError:false,
    reviews:[],
    err: '',
    isSuccess: false,
    note:0,
    isOpen:false
}

var average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export const reviewsBook = (state=initialReviewsState, action={}) =>{
    switch(action.type){
        case 'ADD_REVIEW_PENDING':
            return {...state, isAddPending:true}
        case 'ADD_REVIEW_SUCCESS':
            return {...state, isPending:false, isSuccess: true, reviews:[...state.reviews, action.payload], note:average([...state.reviews, action.payload].map(review => review.note)).toFixed(1)}
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
        
        default:
        return state
    }
}