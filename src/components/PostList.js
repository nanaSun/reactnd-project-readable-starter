import React from 'react'
import {Link} from 'react-router-dom';
import {getPosts,getAllPosts} from '../utils/api'
class PostList extends React.Component {
  state={
  	posts:[]
  }
  componentWillMount = () => {
  	console.log(this.props)
  	// const { categoryId } = this.props.match.params
  	// this.getAllPosts(categoryId)
  }
  getAllPosts = (categoryId) => {
  	let _=this
  	if(typeof categoryId==="undefined"){
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
  	const {onSelect}=this.props
    return (
    <ul className="list-books">
 		{posts.map((post)=>(
          <li key={post.id}  onClick={() => onSelect(post)} >{post.title}</li>
        ))}
    </ul>
    )
  }
}

export default PostList