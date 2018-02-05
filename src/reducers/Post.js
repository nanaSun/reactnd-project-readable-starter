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
            return {
                ...action.item.reduce(function(result, item) {
                  result[item.id] = item;
                  return result;
                }, {})
            };
        case CREATE_POST:
            return {
            	...state,
            	[action.id]:action.item
            };
        case DELETE_POST://deleted=true
            let posts={}
            for(var i in state){
                if(i!==action.id){
                    posts[i]=state[i]
                }
            }
            return {
                ...posts
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