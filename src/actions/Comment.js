export const CREATE_COMMENT = 'CREATE_COMMENT';
export const GET_COMMENT	= 'GET_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export function CommentCreator ({ id,item }) {
  return {
    type: CREATE_COMMENT,
    id,
    item
  }
}
export function CommentRemove ({ id,item }) {
  return {
    type: DELETE_COMMENT,
    id,
    item
  }
}
export function CommentUpdate ({ id,item }) {
  return {
    type: UPDATE_COMMENT,
    id,
    item
  }
}
export function initComments ({ item }) {
  return {
    type: GET_COMMENT,
    item:item
  }
}