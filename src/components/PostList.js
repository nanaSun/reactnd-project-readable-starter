import React from 'react'
import {Link } from 'react-router-dom';
import {getPosts,getAllPosts} from '../utils/api'
import {connect} from 'react-redux'
import store from '../store'

/*actions*/
import {initPosts,postCreator} from '../actions/Post'

class PostList extends React.Component {
  state={
  	posts:[]
  }
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
    this.props.addPost({
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
    
  	if(typeof categoryId === "undefined"){
	    getAllPosts().then(function(res){
			   _.props.getPosts(res)
         console.log(_.props,_.state)
		  })
  	}else{
	    getPosts(categoryId).then(function(res){
  			_.props.getPosts(res)
		  })  		
  	}
  }
  render() {
  	const { posts } = this.state
    console.log(this.props)
    return (
      <div>
      <ul className="list-books">
   		    {posts.map((post)=>(
            <li key={post.id}><Link to={"/posts/"+post.id}>{post.title}</Link></li>
          ))}
      </ul>
    </div>
    )
  }
}
function mapStateToProps(state){
  console.log("mapStateToProps",state);
  return{}
}
function mapDispatchToProps(dispatch){
  return{
    getPosts:(items)=>dispatch(initPosts({item:items})),
    addPost:(data)=>dispatch(postCreator({item:data}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList);
