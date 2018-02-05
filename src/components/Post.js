import React from 'react'
import {connect} from 'react-redux'
import { Redirect,Link } from 'react-router-dom'; 
import CommentList from './CommentList'
import Vote from './Vote'
import {getPost,deletePost} from '../utils/api'
import PostView from '../views/PostView'


import {updatePost as asyncUpdatePost,removeFromList} from '../actions/Post'
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
    RedirectURL:''
  }
  componentWillMount = () => {
    let _=this;
  	const {id } = this.props.match.params
    _.getPost(id)
  	
  }
  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.match.params.id !== this.props.match.params.id){
      const { id } = nextProps.match.params
      let _=this;
      _.setState({
        RedirectURL:''
      })
      _.getPost(id)
    }
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
  deletePost=(id)=>{ 
    var _=this;
    deletePost(id).then(function(res){
      _.setState({deleted:true})
      _.props.deletePost(res.id,res)
      _.setState({RedirectURL:'/'})
    })
  }
  render=()=>{
    const params=this.state;
  	const {id,RedirectURL,deleted} = params;
    //if RedirectURL is set , here will redirect
    if(RedirectURL!==""){
      return <Redirect to="/" />
    }
    if(deleted) return (<div>waiting</div>)
    let CommentTpl="",voteTpl=""
    if(id){
      CommentTpl=<CommentList postId={id}></CommentList>
      voteTpl=<Vote postID={id} type="post"/>
    }
    return (
     <div className="wrapper"> 
      <div><Link className="btn btn-default" to={'/'}>back</Link></div>
      <PostView params={params}/>     
      <div className="row post-edit-bar">
          <p className="col-xs-6 text-left">
          <Link to={`/post/${id}/edit`} className="btn btn-success">edit</Link>
          <i className="btn btn-danger" onClick={this.deletePost.bind(this,id)}>delete</i>
          </p>
          {voteTpl}
      </div>
      {CommentTpl}
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
    updatePost:(id,data)=>dispatch(asyncUpdatePost({id:id,item:data})),
    deletePost:(id,data)=>dispatch(removeFromList({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);