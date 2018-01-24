import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Comment from './Comment'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import {updatePost,getPost} from '../utils/api'
class Post extends React.Component {
  state={
    id:'',
    timestamp:0,
    title:'',
    body:'',
    author:'',
    category:'',
    voteScore:0,
    deleted:false,
    editPost:false
  }
  openPostPanel = () => this.setState(() => ({ editPost: true }))
  closePostPanel = () => this.setState(() => ({ editPost: false }))
  componentWillMount = () => {
    //I don't know why I need to use this code
    Modal.setAppElement('body');
  	const { id } = this.props.match.params
  	this.getPost(id)
  }
  updatePost = (e) => {
    e.preventDefault()
    var _=this;
    const inputs = serializeForm(e.target, { hash: true })
    _.closePostPanel()
    updatePost(_.state.id,{
        id:_.state.id,
        timestamp:inputs.timestamp,
        title:inputs.title,
        body:inputs.body,
        author:inputs.author,
        category:inputs.category,
        voteScore:_.state.voteScore,
        deleted:_.state.deleted
    }).then(function(res){
      _.props.updatePost(_.state.id,{...res})
    })
  }
  getPost = (id) => {
    let _=this
    if(id in _.props.Posts){
      _.setState({..._.props.Posts[id]})
    }else{
      getPost(id).then(function(res){
        _.setState({...res})
      })
    }
  }
  render() {
  	const { title,timestamp ,body,author,category,voteScore,deleted,id,editPost} = this.state
    let CommentTpl=""
    if(id){
      CommentTpl=(<Comment postId={id}></Comment>)
    }
    return (
     <div className="wrapper">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={!editPost}
          onRequestClose={this.openPostPanel}
          contentLabel='Modal'
        >
          <div className="books">
            <p>{id}</p>
            <p>{title}</p>
            <p>{timestamp}</p>
            <p>{body}</p>
            <p>{author}</p>
            <p>{category}</p>
            <p>{voteScore}</p>
          </div>
          {CommentTpl}
          <button onClick={this.openPostPanel}>edit</button>
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={editPost}
          onRequestClose={this.closePostPanel}
          contentLabel='Modal'
        >
          <form onSubmit={this.updatePost}>
            <p><input type="text" name="title" defaultValue={title}/></p>
            <p><input type="text" name="timestamp" defaultValue={timestamp}/></p>
            <p><input type="text" name="body" defaultValue={body}/></p>
            <p><input type="text" name="author" defaultValue={author}/></p>
            <p><input type="text" name="category" defaultValue={category}/></p>
            <button>update</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    Posts:state.posts
  }
}
function mapDispatchToProps(dispatch){
  return{
    updatePost:(id,data)=>dispatch(updatePost({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);