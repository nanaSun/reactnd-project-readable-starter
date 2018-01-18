import React from 'react'
import {connect} from 'react-redux'
import {getComments} from '../utils/api'

/*actions*/
import {initComments,CommentCreator} from '../actions/Comment'

class Comment extends React.Component {
  componentWillMount = () => {
  	const { postId } = this.props
  	this.getComments(postId)
  }
  getComments = (postId) => {
    let _=this

    getComments(postId).then(function(res){
        _.props.getComments(res)
		}) 

  }
  render() {
  	const { comments } = this.props
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
function mapStateToProps(state){
  console.log(state)
  return{
    comments:Object.keys(state.comments).map(function(key) {
        return state.comments[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getComments:(items)=>dispatch(initComments({item:items})),
    addComment:(data)=>dispatch(CommentCreator({item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment);