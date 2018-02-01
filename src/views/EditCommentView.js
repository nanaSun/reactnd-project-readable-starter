import React from 'react'
const EditCommentView=({comment,updateComment,operation})=>(
  <li>
	 <form onSubmit={operation} className="col-md-12">
		  <input type="hidden" name="timestamp" defaultValue={new Date().getTime()}/>
		  <div className="form-group">
		    <label htmlFor="author">author</label>
		    <input className="form-control" type="text" name="author" defaultValue={comment.author}/>
		  </div>
		  <div className="form-group">
		    <label htmlFor="body">body</label>
		    <input className="form-control" type="text" name="body" defaultValue={comment.body}/>
		  </div>
		  <button  type="submit" className="btn btn-default">update</button>
	</form>
  </li>
)
export default EditCommentView