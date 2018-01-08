import React, { Component } from 'react';
import {connect} from 'react-redux'

import {Route} from 'react-router-dom';

import Category from './Category'
import PostList from './PostList'
import Post from './Post'
import Comment from './Comment'
import {getCategories} from '../utils/api'

/*actions*/
import {postCreator} from '../actions/Post'

class App extends Component {
  state={
  	categories:[],
  	posts:{}
  }
  getAllCategories = () => {
  	let _=this
    getCategories()
      .then(function(res){
      	_.setState({
      		categories:res
      	})
      	
      })
  }
  componentWillMount = () => {
  	this.getAllCategories()
  }
  render() {
  	const {categories}=this.state
  	const { addPost} = this.props
    return (
      <div className="container">
			<Route path="/" exact render={({history})=>(
          <PostList history={history} categories={categories} />
			)}
			/>
      <Route path="/:categoryId" exact render={({history})=>(
          <PostList onSelect={(data)=>{
            console.log(data);
            addPost({data})
          }} history={history} categories={categories} />
       )}
      />
			<Route path="/posts/:id" exact component={Post}/>
			<Route path="/posts/:id/comments" exact component={Comment}/>
      </div>
    );
  }
}

function mapStateToProps({posts}){
  // console.log(posts)
  return{}
}
function mapDispatchToProps(dispatch){
  // console.log(dispatch)
  return{
  	addPost:(data)=>dispatch(postCreator(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);