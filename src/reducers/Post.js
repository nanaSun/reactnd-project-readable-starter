import {
    GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
} from '../actions/Post'
const initialState={}
export default function posts (state = initialState, action) {
	 switch(action.type){
        case GET_POSTS:
            console.log(action);
            return {
                ...state,
                ...action.item
            };
        case CREATE_POST:
            console.log(action);
            return {
            	...state,
            	[action.id]:action.item
            };
        case DELETE_POST://deleted=true
            return {
            	...state,
            	[action.id]:action.item
            };
        case UPDATE_POST:
            return {
            	...state,
            	[action.id]:action.item
            };
        default:
            return state;
    }
}