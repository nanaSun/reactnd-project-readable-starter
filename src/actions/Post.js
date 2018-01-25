// Attribute	Type	Description
// id	String	Unique identifier
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// title	String	Post title
// body	String	Post body
// author	String	Post author
// category	String	Should be one of the categories provided by the server
// voteScore	Integer	Net votes the post has received (default: 1)
// deleted	Boolean	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
// 
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const GET_POSTS = 'GET_POSTS';

export function initPosts ({ item }) {
  return {
    type: GET_POSTS,
    item:item
  }
}
export function postCreator ({ item }) {
  return {
    type: CREATE_POST,
    id:item.id,
    item:item
  }
}

export function removeFromList ({ id,item }) {
  return {
    type: DELETE_POST,
    id:item.id,
    item:item
  }
}
export function updatePost ({ id,item }) {
  return {
    type: UPDATE_POST,
    id:item.id,
    item:item
  }
}

