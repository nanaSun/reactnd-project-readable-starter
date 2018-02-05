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
    upVote:false,
    downVote:false
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
  vote = (votetypeid) => {
    let _=this;
    let votetypes=["upVote","downVote"];
    let votetype=!_.state[votetypes[votetypeid]]?votetypes[votetypeid]:votetypes[1-votetypeid];
    let nowstate=_.state[votetypes[votetypeid]]
    if(_.state.type==="post"){
        postVote(_.state.postID,{option:votetype}).then(function(res){
          _.props.updatePostVote(res.id,res)
          _.setState({
            [votetypes[votetypeid]]:!nowstate
          })
        })
    }else{
       
        commentVote(_.state.commentid,{option:votetype}).then(function(res){
          _.props.updateCommentVote(res.id,res)
          _.setState({
            [votetypes[votetypeid]]:!nowstate
          })
        })
    }
  }
  render() {
    let votenum=this.getVoteNum()
    
    return (
     <p className="col-xs-6 text-right vote-bar">
     	<i className={`vote-icon like ${this.state.upVote?"after":""}`} onClick={this.vote.bind(this,0)}></i>
      <i className={`vote-icon dislike ${this.state.downVote?"after":""}`} onClick={this.vote.bind(this,1)}></i>
     	<i>{votenum}</i>
     </p>
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