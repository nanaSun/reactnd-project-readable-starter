import React from 'react'
import {Link} from 'react-router-dom'
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
		  <div className="clearfix">
		  		{addNewPost?(
					<Link className="btn btn-default pull-left" to={'/'}>back</Link>
		  		):(
		  			<Link className="btn btn-default pull-left" to={'/'+params.category+'/'+params.id}>back</Link>
		  		)}
		  		<button type="submit" className="btn btn-default pull-right">{addNewPost?"add":"update"}</button>
		  </div>
		</form>
)
export default EditPostView