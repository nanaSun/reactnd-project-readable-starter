import React from 'react'
import {getComments} from '../utils/api'
class Comment extends React.Component {
  state={
  	comments:[]
  }
  componentWillMount = () => {
  	const { postId } = this.props
  	this.getComments(postId)
  }
  getComments = (postId) => {
    let _=this
    getComments(postId).then(function(res){
			_.setState({
				comments:res
			})
		}) 
  }
  render() {
  	const { comments } = this.state
    return (
    <div className="books">
      <ul className="list-comments">
          {comments.map((comment)=>(
            <li key={comment.id}><p>{comment.author}</p><p>{comment.body}</p></li>
          ))}
      </ul>
    </div>
    )
  }
}

export default Comment