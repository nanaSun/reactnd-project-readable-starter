import React from 'react'
import {Link } from 'react-router-dom';
import {getPosts,getAllPosts} from '../utils/api'
class PostList extends React.Component {
  state={
  	posts:[]
  }
  componentWillMount = () => {
    console.log("componentWillMount",this.props)
  }
  componentWillReceiveProps = (nextProps) => {
    let {pathname}=nextProps.history.location
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
    const {categories} = []
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