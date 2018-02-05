import React from 'react'
import {connect} from 'react-redux'
import {getComments,addComment} from '../utils/api'
import Comment from './Comment'
import sortBy from  'sort-by'
import serializeForm from 'form-serialize'
/*actions*/
import {initComments,CommentCreator} from '../actions/Comment'

class CommentList extends React.Component {
  state={
    sortKey:"id",
    bars:["id","timestamp","voteScore"]
  }
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
    const { postId } = this.props
    const inputs = serializeForm(e.target, { hash: true })
    addComment({
        timestamp: new Date().getTime(),
        author: inputs.author,
        voteScore:0,
        parentId: postId,
        body:inputs.body
    }).then(function(res){
       _.props.addComment({...res}); 
       _.setState({...res})
    })      
  }
  setSortKey=(sortKey)=>{
      if(sortKey===this.state.sortKey){
        sortKey='-'+sortKey
      }
      this.setState({
        sortKey:sortKey
      })
  }
  render() {
  	let { comments } = this.props
    let {sortKey,bars}= this.state
    comments=comments.filter(function(i){
      return !i.deleted;
    })
    if(sortKey){
        comments.sort(sortBy(sortKey));
    }
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
      <h5>TOTAL:{comments.length}</h5>
      <div className="sorting-bar">
        {bars.map((bar,index)=>(
          <span key={"bar"+index}  className={sortKey===bar?"sorting-asc":sortKey===`-${bar}`?"sorting-des":""} onClick={()=>{this.setSortKey(bar)}}>BY {bar==="id"?"DEFAULT":bar.toUpperCase()}<i></i></span>
        ))}
      </div>
      <ul className="list-comments  list-unstyled">
          {comments.length>0&&comments.map((comment)=>(
            <Comment key={comment.id} CommentId={comment.id}/>
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