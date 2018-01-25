import React from 'react'

const EditPostView=({params,addNewPost,operation})=>(
  <form onSubmit={operation}>
	<p>title:<input type="text" name="title" defaultValue={params.title}/></p>
	<p>timestamp:<input type="text" name="timestamp" defaultValue={params.timestamp}/></p>
	<p>body:<input type="text" name="body" defaultValue={params.body}/></p>
	<p>author:<input type="text" name="author" defaultValue={params.author}/></p>
	<p>category:<input type="text" name="category" defaultValue={params.category}/></p>
	<button>{addNewPost?"add":"update"}</button>
 </form>
)
export default EditPostView