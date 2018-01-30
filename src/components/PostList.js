import React from 'react'
import {Link } from 'react-router-dom';
import {getAllPosts} from '../utils/api'
import {connect} from 'react-redux'
import '../styles/postlist.css';
/*actions*/
import {initPosts} from '../actions/Post'

class PostList extends React.Component {
  state={
    categoryId:-1
  }
  componentWillMount(){
    let _=this;
    const {categoryId}=this.props.match.params
    if(typeof categoryId!=="undefined"){
      _.setState({
        categoryId:categoryId
      });
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
  render() {
    const {categoryId}= this.state
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

    return (
      <div className="wrapper">
        <Link className="add" to={"/post/add"}></Link>
        <ul>
     		    {posts.map((post)=>(
              <li key={post.id}><Link to={"/post/"+post.id}>{post.title}</Link></li>
            ))}
        </ul>
        
      </div>
    )
  }
}
function mapStateToProps(state,props){
  console.log("PostList",state,props)
  return{
    posts:Object.keys(state.posts).map(function(key) {
        return state.posts[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getPosts:(items)=>dispatch(initPosts({item:items}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList);
