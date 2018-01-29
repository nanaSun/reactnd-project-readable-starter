
const api = "http://localhost:3001"
// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPosts = (categoryid) =>
  fetch(`${api}/${categoryid}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (postid) =>
  fetch(`${api}/posts/${postid}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = (post) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(post)
	})
	.then(res => res.json())
    .then(data => data)

export const updatePost = (postid,post) =>
	fetch(`${api}/posts/${postid}`, {
		method: 'PUT',
		headers: headers,
		body: JSON.stringify(post)
	})
	.then(res => res.json())
    .then(data => data)

export const deletePost = (id) =>
	fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		headers: headers,
		body: JSON.stringify({
			id:id
		})
	})
	.then(res => res.json())
    .then(data => data)

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addComment = (comment) =>
  fetch(`${api}/comments/`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
    .then(data => data)

export const updateComment = (id,comment) =>
  fetch(`${api}/comments/${id}`,{
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
    .then(data => data)

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`,{
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({
      id:id
    })
  })
  .then(res => res.json())
  .then(data => data)

export const postVote = (id,params) =>
  fetch(`${api}/posts/${id}`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params)
  })
  .then(res => res.json())
  .then(data => data)

export const commentVote = (id,params) =>
  fetch(`${api}/comments/${id}`,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(params)
  })
  .then(res => res.json())
  .then(data => data)
