import React from 'react'
import moment from 'moment';
const CommentView=({comment})=>(
  <div className="row">
	  <p className="col-xs-3"><strong>author:</strong></p>
	  <p className="col-xs-9">{comment.author}</p>
	  <div className="clearfix visible-xs-block"></div>
	  <p className="col-xs-3"><strong>comment:</strong></p>
	  <p className="col-xs-9">{comment.body}</p>
	  <p className="col-xs-12 text-right">last modified:{moment(parseInt(comment.timestamp,10)).format('YYYY-MM-DD HH:mm:ss')}</p>
  </div>
)
export default CommentView