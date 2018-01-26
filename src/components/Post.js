import React from 'react'
import {connect} from 'react-redux'
import CommentList from './CommentList'
import Vote from './Vote'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import {updatePost,getPost,addPost as addNewPost} from '../utils/api'
import PostView from '../views/PostView'
import EditPostView from '../views/EditPostView'
import {updatePost as asyncUpdatePost,postCreator} from '../actions/Post'
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
    editPost:false,
    addNewPost:false
  }
  openPostPanel = () => this.setState(() => ({ editPost: true }))
  closePostPanel = () => this.setState(() => ({ editPost: false }))
  componentWillMount = () => {
    let _=this;
    //I don't know why I need to use this code
    Modal.setAppElement('body');
  	const { id } = this.props.match.params
    if(id==="add"){
      _.setState({
        editPost:true,
        addNewPost:true
      })
    }else{
      _.getPost(id)
    }
  	
  }
  updatePost = (e) => {
    e.preventDefault()
     console.log(this)
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
      _.setState({...res})
    })
  }
  createNewPost = (e) =>{
    e.preventDefault()
    var _=this;
    const inputs = serializeForm(e.target, { hash: true })
    _.closePostPanel()
    addNewPost({
        timestamp:inputs.timestamp,
        title:inputs.title,
        body:inputs.body,
        author:inputs.author,
        category:inputs.category
    }).then(function(res){
       _.props.addPost({...res}); 
       _.setState({...res})
    })      
    
  }
  getPost = (id) => {
    let _=this
    if(id in _.props.Posts){
      _.setState({..._.props.Posts[id]})
    }else{
      getPost(id).then(function(res){
        _.props.updatePost(id,{...res})
        _.setState({...res})
      })
    }
  }
  render() {
    const params=this.state;
  	const {id,editPost,addNewPost} = params;
    let CommentTpl="",voteTpl=""
    if(id){
      CommentTpl=(<CommentList postId={id}></CommentList>)
      voteTpl=( <Vote postID={id} type="post"/>)
    }
    console.log(id)
    return (
     <div className="wrapper">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={!editPost}
          onRequestClose={this.openPostPanel}
          contentLabel='Modal'
        >
          <PostView params={params}/>
          {voteTpl}
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
          
            <EditPostView params={params} addNewPost={addNewPost}  operation={addNewPost?this.createNewPost:this.updatePost}/>
          
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state,props){
  return{
    Posts:state.posts
  }
}
function mapDispatchToProps(dispatch){
  return{
    addPost:(data)=>dispatch(postCreator({item:data})),
    updatePost:(id,data)=>dispatch(asyncUpdatePost({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);