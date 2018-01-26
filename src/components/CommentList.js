import React from 'react'
import {connect} from 'react-redux'
import {getComments,addComment} from '../utils/api'
import Comment from './Comment'
import serializeForm from 'form-serialize'
/*actions*/
import {initComments,CommentCreator} from '../actions/Comment'

class CommentList extends React.Component {
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
    const { postId,timestamp} = this.props
    const inputs = serializeForm(e.target, { hash: true })
    addComment({
        timestamp: timestamp,
        author: inputs.nickname,
        parentId: postId,
        body:inputs.newComment
    }).then(function(res){
       _.props.addComment({...res}); 
       _.setState({...res})
    })      

  }
  closeEditPanel(){

  }
  openEditPanel(){

  }
  updateComment(){

  }
  render() {
  	const { comments } = this.props
    return (
    <div className="books">
      <ul className="list-comments">
          {comments.map((comment)=>(
            <Comment CommentId={comment.id}  key={comment.id}/>
          ))}
      </ul>
      <form onSubmit={this.addComment}>
        <input name="nickname"/>
        <input name="newComment"/>
        <button>addComment</button>
      </form>
    </div>
    )
  }
}
function mapStateToProps(state){
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
export default connect(mapStateToProps,mapDispatchToProps)(CommentList);