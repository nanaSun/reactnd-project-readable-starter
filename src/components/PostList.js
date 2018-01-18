import React from 'react'
import {Link } from 'react-router-dom';
import {getPosts,getAllPosts,addPost as addNewPost} from '../utils/api'
import {connect} from 'react-redux'
import store from '../store'

/*actions*/
import {initPosts,postCreator} from '../actions/Post'

class PostList extends React.Component {
  componentWillMount = () => {
    const {categoryId}=this.props.match.params;
    this.getAllPosts(categoryId)
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.match.params.categoryId !== this.props.match.params.categoryId){
      const {categoryId}=nextProps.match.params;
      this.getAllPosts(categoryId)
    }
     
  }
  getAllPosts = (categoryId) => {
  	let _=this
  	if(typeof categoryId === "undefined"){
	    getAllPosts().then(function(res){
			   _.props.getPosts(res)
		  })
  	}else{
	    getPosts(categoryId).then(function(res){
  			_.props.getPosts(res)
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
  	const { posts } = this.props
    console.log(this.props)
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
  console.log(state)
  return{
    posts:Object.keys(state.posts).map(function(key) {
        return state.posts[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getPosts:(items)=>dispatch(initPosts({item:items})),
    addPost:(data)=>dispatch(postCreator({item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList);
