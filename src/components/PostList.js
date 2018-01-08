import React from 'react'
import {Link } from 'react-router-dom';
import {getPosts,getAllPosts} from '../utils/api'
class PostList extends React.Component {
  state={
  	posts:[]
  }
  componentWillMount = () => {
    let {pathname}=this.props.history.location
  	let categoryId = pathname.replace("/","")
  	this.getAllPosts(categoryId)
  }
  getAllPosts = (categoryId) => {
  	let _=this
  	if(categoryId===""){
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
    const {categories} = this.props
    return (
      <div>
      <ul className="list-books">
          {categories.map((category)=>(
            <li key={category.path}><Link to={'/'+category.path}>{category.name}</Link></li>
          ))}
      </ul>
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