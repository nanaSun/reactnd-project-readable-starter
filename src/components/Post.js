import React from 'react'
import {Link} from 'react-router-dom';
import {getPost} from '../utils/api'
class Post extends React.Component {
  state={
  	post:{}
  }
  componentWillMount = () => {
  	const { id } = this.props.match.params
    console.log(this.props)
  	this.getPost(id)
  }
  getPost = (id) => {
    let _=this
    getPost(id).then(function(res){
			_.setState({
				post:res
			})
		}) 
  }
  render() {
  	const { post } = this.state
    return (
    <div className="books">
   		<span>{post.id}</span>
    </div>
    )
  }
}

export default Post