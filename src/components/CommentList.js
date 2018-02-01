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
        timestamp: new Date().getTime(),
        author: inputs.author,
        parentId: postId,
        body:inputs.body
    }).then(function(res){
       _.props.addComment({...res}); 
       _.setState({...res})
    })      
  }
  render() {
  	let { comments } = this.props
    comments=comments.filter(function(i){
      return !i.deleted;
    })
    return (
    <div className="books">
      <h3>COMMENTS:</h3>
      <form onSubmit={this.addComment}>
        <div className="form-group">
          <label htmlFor="author">Nickname</label>
          <input className="form-control" type="text" name="author"/>
        </div>
        <div className="form-group">
          <label htmlFor="body">Your Comment:</label>
          <input className="form-control" type="text" name="body"/>
        </div>
        <button type="submit" className="form-control">SUBMIT</button>
      </form>
      <h4>OTHER COMMENTS:</h4>
      <ul className="list-comments  list-unstyled">
          {comments.length>0&&comments.map((comment)=>(
            <li key={comment.id}>
            <Comment CommentId={comment.id}/>
            </li>
          ))}
      </ul>
      
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