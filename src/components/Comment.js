import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import {updateComment} from '../utils/api'
import Vote from './Vote'
import CommentView from '../views/CommentView'
import EditCommentView from '../views/EditCommentView'

import {CommentUpdate as asyncUpdateComment} from '../actions/Comment'
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
    Modal.setAppElement('body');
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
        timestamp:inputs.timestamp,
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
  getComment = (id) => {
    let _=this
    _.setState({..._.props.comments[id]})
  }
  render() {
    const params=this.state;
    const {id,editComment} = params;
    return (
     <div className="wrapper">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={!editComment}
          onRequestClose={this.openCommentPanel}
          contentLabel='Modal'
        >
          <CommentView comment={params}/>
          <Vote commentid={id} type="comment"/>
          <button onClick={this.openCommentPanel}>edit</button>
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editComment}
          onRequestClose={this.closeCommentPanel}
          contentLabel='Modal'
        >
            <EditCommentView comment={params} operation={this.updateComment}/> 
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state,props){
  return{
    comments:state.comments
  }
}
function mapDispatchToProps(dispatch){
  return{
    updateComment:(id,data)=>dispatch(asyncUpdateComment({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment);