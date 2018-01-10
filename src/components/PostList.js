import React from 'react'
import {Link } from 'react-router-dom';
import {getPosts,getAllPosts} from '../utils/api'
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
  	if(typeof categoryId === "undefined"){
	    getAllPosts().then(function(res){
			_.setState({
				posts:res
			})
		})
  	}else{
	    getPosts(categoryId).then(function(res){
			_.setState({
				posts:res
			})
		})  		
  	}
  }
  render() {
  	const { posts } = this.state
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

export default PostList