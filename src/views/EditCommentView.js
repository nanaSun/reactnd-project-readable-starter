import React from 'react'
const EditCommentView=({comment,updateComment,operation})=>(
  <li>
	  <form onSubmit={operation}>
		<p>timestamp:<input type="text" name="timestamp" defaultValue={comment.timestamp}/></p>
		<p>body:<input type="text" name="body" defaultValue={comment.body}/></p>
		<p>author:<input type="text" name="author" defaultValue={comment.author}/></p>
		<button>"update"</button>
	 </form>
  </li>
)
export default EditCommentView