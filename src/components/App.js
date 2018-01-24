import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'
import store from '../store';
import {getAllPosts} from '../utils/api'
import {initPosts} from '../actions/Post'
class App extends Component {
  componentWillMount(){
    var _=this;
    getAllPosts().then(function(res){
       _.props.getPosts(res)
    })
  }
  render() {
    return (
      <div className="container">
        <Category />
  			<Route path="/" exact component={PostList}/>
        <Route path="/:categoryId" exact component={PostList}/>
        <Route path="/posts/:id" exact component={Post}/>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    posts:Object.keys(state.posts).map(function(key) {
        return state.posts[key];
    })
  }
}
function mapDispatchToProps(dispatch){
  return{
    getPosts:(items)=>dispatch(initPosts({item:items}))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);