import React from 'react'
const CommentView=({comment})=>(
  <li>
	  <p>{comment.author}</p><p>{comment.body}</p>
  </li>
)
export default CommentView