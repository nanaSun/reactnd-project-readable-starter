import React from 'react'
import MyEditor from './EditorView';
import TimeFieldView from './TimeFieldView';
const EditPostView=({params,addNewPost,operation})=>(
		 <form onSubmit={operation} className="col-md-12">
		  <div className="form-group">
		    <label htmlFor="title">title</label>
		    <input className="form-control" type="text" name="title" defaultValue={params.title}/>
		  </div>
		  <TimeFieldView timestamp={params.timestamp}/>
		  <div className="form-group">
		    <label htmlFor="author">author</label>
		    <input className="form-control" type="text" name="author" defaultValue={params.author}/>
		  </div>
		  <div className="form-group">
		    <label htmlFor="category">category</label>
		    <input className="form-control" type="text" name="category" defaultValue={params.category}/>
		  </div>
		  <div className="form-group">
		    <label htmlFor="body">body</label>
		    <MyEditor defaultValue={params.body}/>
		  </div>
		  <button type="submit" className="btn btn-default">{addNewPost?"add":"update"}</button>
		</form>
)
export default EditPostView