import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'

class App extends Component { 
  render() {
    return (<div className="container">
              <Category />
              <Route path="/" exact component={PostList}/>
              <Route path="/:categoryId" exact component={PostList}/>
              <Route path="/post/:id" exact component={Post}/>
            </div>);
  }
}
export default App;