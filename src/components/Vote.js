import React from 'react'
import {connect} from 'react-redux'
import {postVote,commentVote} from '../utils/api'
import {CommentUpdate as asyncUpdateComment} from '../actions/Comment'
import {updatePost as asyncUpdatePost} from '../actions/Post'
class Vote extends React.Component {
  state={
    commentid:'',
    postID:'',
    type:'',
    voted:false
  }
  componentWillMount = () => {
  	const {postID,commentid,type} =this.props
    this.setState({
      postID:postID,
      commentid:commentid,
      type:type
    })
  }
  getVoteNum=()=>{
    if(this.state.type==="post"){
        return this.props.Posts[this.state.postID].voteScore
    }else{
        return this.props.Comments[this.state.commentid].voteScore
    }
  }
  vote = () => {
    var _=this;
    let votetype=_.state.voted?"downVote":"upVote"
    if(_.state.type==="post"){
        postVote(_.state.postID,{option:votetype}).then(function(res){
          _.props.updatePostVote(res.id,res)
          _.setState({
            voted:!_.state.voted
          })
        })
    }else{
        commentVote(_.state.commentid,{option:votetype}).then(function(res){
          _.props.updateCommentVote(res.id,res)
          _.setState({
            voted:!_.state.voted
          })
        })
    }
  }
  render() {
    let votenum=this.getVoteNum()
    return (
     <div>
     	<button onClick={this.vote}>Vote</button>
     	<p>{votenum}</p>
     </div>
    )
  }
}

function mapStateToProps(state,props){
  return{
    Comments:state.comments,
    Posts:state.posts
  }
}
function mapDispatchToProps(dispatch){
  return{
    updatePostVote:(id,data)=>dispatch(asyncUpdatePost({id:id,item:data})),
    updateCommentVote:(id,data)=>dispatch(asyncUpdateComment({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Vote);