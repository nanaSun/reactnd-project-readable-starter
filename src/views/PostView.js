import React from 'react'
import htmlToText from 'html-to-text';

const PostView=({params})=>(
  <div className="books">
    <p>id:{params.id}</p>
    <p>title:{params.title}</p>
    <p>timestamp:{params.timestamp}</p>
    <div className="post-body"  dangerouslySetInnerHTML={{__html: params.body}}></div>
    <p>author:{params.author}</p>
    <p>category:{params.category}</p>
  </div>
)
export default PostView