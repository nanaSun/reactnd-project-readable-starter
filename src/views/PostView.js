import React from 'react'

const PostView=({params})=>(
  <div className="books">
    <p>id:{params.id}</p>
    <p>title:{params.title}</p>
    <p>timestamp:{params.timestamp}</p>
    <p>body:{params.body}</p>
    <p>author:{params.author}</p>
    <p>category:{params.category}</p>
    <p>voteScore:{params.voteScore}</p>
  </div>
)
export default PostView