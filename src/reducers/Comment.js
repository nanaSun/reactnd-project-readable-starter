import {
    GET_COMMENT,
    CREATE_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT
} from '../actions/Comment'
const initialState={}
export default function comments (state = initialState, action) {
	 switch(action.type){
        case GET_COMMENT:
            return{
                ...action.item.reduce(function(result, item) {
                  result[item.id] = item;
                  return result;
                }, {})
            }
        case CREATE_COMMENT:
            return {
            	...state,
            	[action.id]:action.item
            };
        case DELETE_COMMENT://deleted=true
            return {
            	...state,
            	[action.id]:action.item
            };
        case UPDATE_COMMENT:
            return {
            	...state,
            	[action.id]:action.item
            };
        default:
            return state;
    }
}