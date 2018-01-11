import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from '../actions/Comment'
const initialState={}
export default function comments (state = initialState, action) {
	 switch(action.type){
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