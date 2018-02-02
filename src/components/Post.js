import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'; 
import CommentList from './CommentList'
import Vote from './Vote'
import serializeForm from 'form-serialize'
import {updatePost,getPost,addPost as addNewPost,deletePost} from '../utils/api'
import PostView from '../views/PostView'
import EditPostView from '../views/EditPostView'


import {updatePost as asyncUpdatePost,postCreator,removeFromList} from '../actions/Post'
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
    addNewPost:false,
    RedirectURL:''
  }
  //control the edit panel
  openPostPanel = () => this.setState(() => ({ editPost: true }))
  closePostPanel = () => this.setState(() => ({ editPost: false }))
  //when create new post, need to set some state
  setStateToCreate = () =>{
      this.setState({
        editPost:true,
        addNewPost:true,
        RedirectURL:''
      })
  }
  componentWillMount = () => {
    let _=this;
  	const { id } = this.props.match.params
    if(id==="add"){
      _.setStateToCreate()
    }else{
      _.getPost(id)
    }
  	
  }
  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.match.params.id !== this.props.match.params.id){
      const { id } = nextProps.match.params
      let _=this;
      if(id==="add"){
         _.setStateToCreate()
      }else{
        _.setState({
          editPost:false,
          addNewPost:false,
          RedirectURL:''
        })
        _.getPost(id)
      }
    }
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
      _.setState({...res})
    })
  }
  createNewPost = (e) =>{
    e.preventDefault()
    var _=this;
    const inputs = serializeForm(e.target, { hash: true })
    addNewPost({
        timestamp:inputs.timestamp,
        title:inputs.title,
        body:inputs.body,
        author:inputs.author,
        category:inputs.category
    }).then(function(res){
       _.props.addPost({...res});
       //after create successful, we need to redirect
       _.setState({...res,RedirectURL:'/post/'+res.postId})
    })      
    
  }
  getPost = (id) => {
    let _=this
    if(id in _.props.Posts){
      _.setState({..._.props.Posts[id]})
    }else{
      //when the url is not from indexpage, we need to fetch the info from the api
      getPost(id).then(function(res){
        _.props.updatePost(id,{...res})
          if("id" in res){
            _.setState({...res})
          }else{
            _.setState({RedirectURL:'/'})
          }
      })
    }
  }
  deletePost=(e)=>{ 
    var _=this,id=e;
    deletePost(id).then(function(res){
      _.props.deletePost(res.id,res)
      _.setState({RedirectURL:'/'})
    })
  }
  render=()=>{
    const params=this.state;
  	const {id,editPost,addNewPost,RedirectURL} = params;
    //if RedirectURL is set , here will redirect
    if(RedirectURL!==""){
      return <Redirect to="/" />
    }
    let CommentTpl="",voteTpl=""
    if(id){
      CommentTpl=<CommentList postId={id}></CommentList>
      voteTpl=<Vote postID={id} type="post"/>
    }
    if(!editPost){
      return (
       <div className="wrapper"> 
        <PostView params={params}/>     
        <div className="row post-edit-bar">
            <p className="col-xs-6">
              <i className="btn btn-success" onClick={this.openPostPanel}>edit</i>
              <i className="btn btn-danger" onClick={this.deletePost.bind(this,id)}>delete</i>
            </p>
            {voteTpl}
        </div>
        {CommentTpl}
       </div>
      )
    }else{
      return (
        <div className="wrapper">
          <EditPostView params={params} addNewPost={addNewPost}  operation={addNewPost?this.createNewPost:this.updatePost} closePostPanel={ this.closePostPanel}/>
        </div>
      )
    } 
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
    updatePost:(id,data)=>dispatch(asyncUpdatePost({id:id,item:data})),
    deletePost:(id,data)=>dispatch(removeFromList({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);