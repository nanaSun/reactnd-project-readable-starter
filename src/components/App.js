import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'
import {getCategories} from '../utils/api'

/*actions*/
import {postCreator} from '../actions/Post'

class App extends Component {
  state={
    categories:[]
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
  	const { categories }=this.state
  	const { addPost} = this.props
    console.log(this.props,this.state)
    return (
      <div className="container">
        <Category categories={categories}/>
  			<Route path="/" exact component={PostList}/>
        <Route path="/:categoryId" exact component={PostList}/>
        <Route path="/posts/:id" exact component={Post}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    categories:state.categories
  }
}
function mapDispatchToProps(dispatch){
  return{
  	addPost:(data)=>dispatch(postCreator(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);