import React from 'react'
import {Link} from 'react-router-dom';
import {getComments} from '../utils/api'
class Comment extends React.Component {
  state={
  	comments:[]
  }
  componentWillMount = () => {
  	const { id } = this.props.match.params
  	this.getComments(id)
  }
  getComments = (id) => {
    let _=this
    getComments(id).then(function(res){
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