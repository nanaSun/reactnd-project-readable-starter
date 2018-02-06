import React from 'react'
import {Link } from 'react-router-dom'
import {getAllPosts,deletePost} from '../utils/api'
import {connect} from 'react-redux'
import sortBy from  'sort-by'
import moment from 'moment';
import ReactLoading from 'react-loading';
import Vote from './Vote'
/*actions*/
import {initPosts,removeFromList} from '../actions/Post'

class PostList extends React.Component {
  state={
    categoryId:-1,
    sortKey:'id',
    loading:true,
    bars:["#","title","time","vote","author","comment"]
  }
  componentWillMount(){
    let _=this
    const {categoryId}=this.props.match.params
    if(typeof categoryId!=="undefined"){
      _.setState({
        categoryId:categoryId
      })
    }
    getAllPosts().then(function(res){
       _.props.getPosts(res)
       _.setState({
          loading:false
       })
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.categoryId !== this.props.match.params.categoryId){
      const {categoryId}=nextProps.match.params
      this.setState({
        categoryId:categoryId,
        loading:false
      })
    }
  }
  setSortKey=(sortKey)=>{
      if(sortKey==="#"){
        sortKey="id"
      }else if(sortKey==="-#"){
        sortKey="-id"
      }
      if(sortKey===this.state.sortKey){
        sortKey='-'+sortKey
      }
      this.setState({
        sortKey:sortKey
      })

  }
  deletePost=(id)=>{ 
    var _=this;
    deletePost(id).then(function(res){
      _.props.deletePost(res.id,res)
      _.setState({RedirectURL:'/'})
    })
  }
  render() {
    const {categoryId,sortKey,bars,loading}= this.state
    let { posts } = this.props
    if(categoryId!==-1&&categoryId!=="post"){
      posts=posts.filter(function(post){
        return post.category===categoryId&&!post.deleted
      })
    }else{
      posts=posts.filter(function(post){
        return !post.deleted
      })
    }
    if(sortKey){
        posts.sort(sortBy(sortKey));
    }
    if(!loading){
      return (
        <div>
          <div className="clearfix">
              <Link className="btn btn-success pull-right " to={"/add"}>New Post</Link>
          </div>
          <table className="table table-hover post-body">
              <thead>
                <tr className="sorting-bar">
                  {bars.map((bar,index)=>(
                    <th key={"bar"+index} className={sortKey==={bar}?"sorting-asc":sortKey===`-${bar}`?"sorting-des":""} onClick={()=>{this.setSortKey(bar)}}>{bar.toUpperCase()}<i></i></th>
                  ))}
                  <th>OPERATION</th>
                </tr>
              </thead>
              <tbody>
       		    {posts.map((post,index)=>(
                <tr key={post.id}>
                    <th>{index+1}</th>
                    <td><Link to={"/"+post.category+"/"+post.id}>{post.title}</Link></td>
                    <td>{moment(parseInt(post.timestamp,10)).format('MMM DD, YYYY')}</td>
                    <td>{post.voteScore}</td>
                    <td>{post.author}</td>
                    <td>{post.commentCount}</td>
                    <td className="row">
                      <p className="col-xs-6  post-edit-bar">
                        <Link to={'/'+post.category+"/"+post.id+'/edit'} className="btn btn-success">edit</Link>
                        <i className="btn btn-danger" onClick={this.deletePost.bind(this,post.id)}>delete</i>
                      </p>
                      <Vote postID={post.id} type="post"/>
                    </td>
                </tr>
              ))}
              </tbody>
          </table>
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
    posts:Object.keys(state.posts).map(function(key) {
        return state.posts[key]
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getPosts:(items)=>dispatch(initPosts({item:items})),
    deletePost:(id,data)=>dispatch(removeFromList({id:id,item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList)
