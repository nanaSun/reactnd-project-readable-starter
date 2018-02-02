import React from 'react'
import {Link } from 'react-router-dom'
import {getAllPosts} from '../utils/api'
import {connect} from 'react-redux'
import sortBy from  'sort-by'
import moment from 'moment';
/*actions*/
import {initPosts} from '../actions/Post'

class PostList extends React.Component {
  state={
    categoryId:-1,
    sortKey:'id'
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
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.categoryId !== this.props.match.params.categoryId){
      const {categoryId}=nextProps.match.params
      this.setState({
        categoryId:categoryId
      })
    }
  }
  setSortKey=(sortKey)=>{
      if(sortKey===this.state.sortKey){
        sortKey='-'+sortKey
      }
      this.setState({
        sortKey:sortKey
      })

  }
  render() {
    const {categoryId,sortKey}= this.state
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
    return (
      <div>
        <div className="clearfix">
            <Link className="btn btn-success pull-right " to={"/post/add"}>New Post</Link>
        </div>
        <table className="table table-hover post-body">
            <thead>
              <tr className="sorting-bar">
                <th className={sortKey==="id"?"sorting-asc":sortKey==="-id"?"sorting-des":""} onClick={()=>{this.setSortKey("id")}}>#<i></i></th>
                <th className={sortKey==="title"?"sorting-asc":sortKey==="-title"?"sorting-des":""} onClick={()=>{this.setSortKey("title")}}>TITLE<i></i></th>
                <th className={sortKey==="timestamp"?"sorting-asc":sortKey==="-timestamp"?"sorting-des":""}  onClick={()=>{this.setSortKey("timestamp")}}>TIME<i></i></th>
                <th className={sortKey==="voteScore"?"sorting-asc":sortKey==="-voteScore"?"sorting-des":""}  onClick={()=>{this.setSortKey("voteScore")}}>VOTE<i></i></th>
                <th className={sortKey==="author"?"sorting-asc":sortKey==="-author"?"sorting-des":""}  onClick={()=>{this.setSortKey("author")}}>AUTHOR<i></i></th>
              </tr>
            </thead>
            <tbody>
     		    {posts.map((post,index)=>(
              <tr key={post.id}>
                  <th>{index}</th>
                  <td><Link to={"/post/"+post.id}>{post.title}</Link></td>
                  <td>{moment(parseInt(post.timestamp,10)).format('MMM DD, YYYY')}</td>
                  <td>{post.voteScore}</td>
                  <td>{post.author}</td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
    )
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
    getPosts:(items)=>dispatch(initPosts({item:items}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList)
