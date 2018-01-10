import React from 'react'
import {Link} from 'react-router-dom';
import Comment from './Comment'
import {getPost} from '../utils/api'
class Post extends React.Component {
  state={
    id:'',
    timestamp:0,
    title:'',
    body:'',
    author:'',
    category:'',
    voteScore:0,
    deleted:false
  }
  componentWillMount = () => {
  	const { id } = this.props.match.params
  	this.getPost(id)
  }
  getPost = (id) => {
    let _=this
    getPost(id).then(function(res){
			_.setState({
				id:res.id,
        timestamp:res.timestamp,
        title:res.title,
        body:res.body,
        author:res.author,
        category:res.category,
        voteScore:res.voteScore,
        deleted:res.deleted
			})
		}) 
  }
  render() {
  	const { title,timestamp ,body,author,category,voteScore,deleted,id} = this.state
    let CommentTpl=""
    if(id){
      CommentTpl=(<Comment postId={id}></Comment>)
    }
    return (
      <div className="wrapper">
        <div className="books">
          <p>{id}</p>
          <p>{title}</p>
          <p>{timestamp}</p>
          <p>{body}</p>
          <p>{author}</p>
          <p>{category}</p>
          <p>{voteScore}</p>
        </div>
        {CommentTpl}
      </div>
    )
  }
}

export default Post