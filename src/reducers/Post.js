import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
} from '../actions'
const initialState={}
function postReducer (state = initialState, action) {
	 switch(action.type){
        case CREATE_POST:
            return {
            	...state,
            	[action.id]:action.item
            };
        case REMOVE_FROM_LIST://deleted=true
            return {
            	...state,
            	[action.id]:action.item
            };
        case UPDATE_POST:
            return {
            	...state
            	[action.id]:action.item
            };
        default:
            return state;
    }
}