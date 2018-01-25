import React from 'react'
import {connect} from 'react-redux'
import {getComments,addComment} from '../utils/api'
import serializeForm from 'form-serialize'
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
  addComment = (e) => {
    e.preventDefault()
    var _=this;
    const { postId,timestamp,author} = this.props
    const inputs = serializeForm(e.target, { hash: true })
    addComment({
        timestamp: timestamp,
        author: author,
        parentId: postId,
        body:inputs.newComment
    }).then(function(res){
       _.props.addComment({...res}); 
       _.setState({...res})
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
      <form onSubmit={this.addComment}>
        <input name="newComment"/>
        <button>addComment</button>
      </form>
    </div>
    )
  }
}
function mapStateToProps(state){
  console.log("Comment",state)
  return{
    comments:Object.keys(state.comments).map(function(key) {
        return state.comments[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getComments:(items)=>dispatch(initComments({item:items})),
    addComment:(data)=>dispatch(CommentCreator({id:data.id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment);