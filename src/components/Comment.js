import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import {updateComment,deleteComment} from '../utils/api'
import Vote from './Vote'
import CommentView from '../views/CommentView'
import EditCommentView from '../views/EditCommentView'

import {CommentUpdate as asyncUpdateComment,CommentRemove} from '../actions/Comment'
class Comment extends React.Component {
  state={
    id:'',
    parentId:'',
    timestamp:0,
    body:'',
    author:'',
    voteScore:0,
    parentDeleted:false,
    deleted:false,
    editComment:false
  }
  openCommentPanel = () => this.setState(() => ({ editComment: true }))
  closeCommentPanel = () => this.setState(() => ({ editComment: false }))
  componentWillMount = () => {
    let _=this;
    //I don't know why I need to use this code
    Modal.setAppElement('#root');
    const { CommentId } = this.props
    _.getComment(CommentId)
    
  }
  updateComment = (e) => {
    e.preventDefault()
     console.log(this)
    var _=this;
    const inputs = serializeForm(e.target, { hash: true })
    _.closeCommentPanel()
    updateComment(_.state.id,{
        id:_.state.id,
        timestamp:new Date().getTime(),
        body:inputs.body,
        author:inputs.author,
        voteScore:_.state.voteScore,
        deleted:_.state.deleted,
        parentDeleted:_.state.parentDeleted
    }).then(function(res){
      _.props.updateComment(_.state.id,{...res})
      _.setState({...res})
    })
  }
  deleteComment=(e)=>{
    var _=this,id=e;
    console.log(id)
    deleteComment(id).then(function(res){
      console.log(res)
      _.props.deleteComment(res.id,res)
    })
  }
  getComment = (id) => {
    let _=this
    _.setState({..._.props.comments[id]})
  }
  render() {
    const params=this.state;
    const {id,editComment} = params;
    if(editComment){
       return (<div><EditCommentView comment={params} operation={this.updateComment}/></div>)
    }else{
      return (
        <div>
          <CommentView comment={params}/>
          <div className="row">
            <p className="col-xs-6">
              <i className="btn btn-success" onClick={this.openCommentPanel}>edit</i>
              <i className="btn btn-warning" onClick={this.deleteComment.bind(this,id)}>delete</i>
            </p>
            <Vote commentid={id} type="comment"/>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state,props){
  return{
    comments:state.comments
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateComment:(id,data)=>dispatch(asyncUpdateComment({id:id,item:data})),
    deleteComment:(id,data)=>dispatch(CommentRemove({id:data.id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment);