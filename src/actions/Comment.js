export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export function CommentCreator ({ id,item }) {
  return {
    type: CREATE_COMMENT,
    id,
    item
  }
}