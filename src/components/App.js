import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'
import store from '../store';
class App extends Component {
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
  return{}
}
function mapDispatchToProps(dispatch){
  return{}
}
export default connect(mapStateToProps,mapDispatchToProps)(App);