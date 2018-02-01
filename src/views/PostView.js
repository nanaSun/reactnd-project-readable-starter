import React from 'react'
import htmlToText from 'html-to-text';
import {Link } from 'react-router-dom';
import moment from 'moment';
const PostView=({params})=>(
  <div className="books">
    <h1>{params.title}</h1>
    <p>{moment(params.timestamp).format('YYYY-MM-DD HH:mm:ss')}</p>
    <p>author:{params.author}</p>
    <Link to={"/"+params.category}>{params.category}</Link>
    <div className="post-body"  dangerouslySetInnerHTML={{__html: params.body}}></div>  
  </div>
)
export default PostView