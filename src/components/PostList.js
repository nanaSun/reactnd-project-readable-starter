import React from 'react'
import {Link } from 'react-router-dom';
import {getAllPosts} from '../utils/api'
import {connect} from 'react-redux'

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
    console.log(categoryId,posts)
    if(categoryId!==-1){
      posts=posts.filter(function(post){
        return post.category===categoryId
      })
    }

    return (
      <div>
        <ul className="list-books">
     		    {posts.map((post)=>(
              <li key={post.id}><Link to={"/post/"+post.id}>{post.title}</Link></li>
            ))}
        </ul>
        <Link to={"/post/add"}>add</Link>
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
