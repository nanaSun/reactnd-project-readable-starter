import React from 'react'
import {Link } from 'react-router-dom';
import {addPost as addNewPost} from '../utils/api'
import {connect} from 'react-redux'
import store from '../store'

/*actions*/
import {initPosts,postCreator} from '../actions/Post'

class PostList extends React.Component {
  state={
    categoryId:-1
  }
  componentWillMount(){
    const {categoryId}=this.props.match.params
    this.setState({
      categoryId:categoryId
    })
  }
  componentWillReceiveProps(nextProps){
    console.log(this.state)
    if(nextProps.match.params.categoryId !== this.props.match.params.categoryId){
      const {categoryId}=nextProps.match.params
      this.setState({
        categoryId:categoryId
      })
    }
  }
  addPost(){
    let _=this
    addNewPost({
      id: '9xf0y6ziyjabvozdd253nF',
      timestamp: 1467166872634,
      title: 'New post',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 0
    }).then(function(res){
       _.props.addPost({
      id: '9xf0y6ziyjabvozdd253nF',
      timestamp: 1467166872634,
      title: 'New post',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 0
    }); 
    })      
    
  }
  render() {
    const {categoryId}= this.state
    let { posts } = this.props
    if(categoryId!==-1){
      posts=posts.filter(function(post){
        return post.category===categoryId
      })
    }
    return (
      <div>
      <ul className="list-books">
   		    {posts.map((post)=>(
            <li key={post.id}><Link to={"/posts/"+post.id}>{post.title}</Link></li>
          ))}
      </ul>
      <button onClick={()=>this.addPost()}>add</button>
    </div>
    )
  }
}
function mapStateToProps(state){
  console.log("PostList",state)
  return{
    posts:Object.keys(state.posts).map(function(key) {
        return state.posts[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    addPost:(data)=>dispatch(postCreator({item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList);
