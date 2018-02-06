import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import serializeForm from 'form-serialize'
import {updatePost,getPost,addPost as addNewPost} from '../utils/api'
import EditPostView from '../views/EditPostView'
import ReactLoading from 'react-loading';

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
    addNewPost:false,
    RedirectURL:''
  }
  //when create new post, need to set some state
  setStateToCreate = () =>{
      this.setState({
        addNewPost:true,
        RedirectURL:''
      })
  }
  componentWillMount = () => {
    let _=this;
  	const { id } = this.props.match.params
    if(typeof id==="undefined"){
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
      _.setState({...res,RedirectURL:'/'+res.category+"/"+res.id})
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
       _.setState({...res,RedirectURL:'/'+res.category+"/"+res.id})
    })      
    
  }
  getPost = (id) => {
    let _=this
    if(id in _.props.Posts){
      _.setState({..._.props.Posts[id]})
    }else{
      //when the url is not from indexpage, we need to fetch the info from the api
      getPost(id).then(function(res){
        if("id" in res){
           _.props.updatePost(id,{...res})
          _.setState({...res})
        }else{
          _.setState({RedirectURL:'/'})
        }
      })
    }
  }
  render=()=>{
    const params=this.state;
  	const {id,addNewPost,RedirectURL} = params;
    if(RedirectURL!==""){
      return <Redirect to={RedirectURL} />
    }
    if(id||addNewPost){
      return (
        <div className="wrapper">
          <EditPostView params={params} addNewPost={addNewPost}  operation={addNewPost?this.createNewPost:this.updatePost}/>
        </div>
      )
    }else{
      return(
        <div className="loading">
          <ReactLoading type='bubbles' color='#222'/>
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