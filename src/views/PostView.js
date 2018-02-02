import React from 'react'
import {Link } from 'react-router-dom';
import moment from 'moment';
const PostView=({params})=>(
  <div className="post-view">
    <h1>{params.title}</h1>
    <p className="post-info">{params.author} | {moment(parseInt(params.timestamp,10)).format('MMM DD, YYYY')}</p>
    <div className="post-body"  dangerouslySetInnerHTML={{__html: params.body}}></div> 
    <Link className="category-path" to={"/"+params.category}>{params.category}</Link> 
  </div>
)
export default PostView