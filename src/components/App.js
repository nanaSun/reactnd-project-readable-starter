import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'

class App extends Component { 
  render() {
    return (<div>
    		  <header className="navbar navbar-inverse">
    		  	<div className="container">
			      <div className="navbar-header">
			     		<span className="navbar-brand">My blog</span>
			      </div>
			    </div>
    		  </header>
              <Category />
              <div className="container">
	              <Route path="/" exact component={PostList}/>
	              <Route path="/:categoryId" exact component={PostList}/>
	              <Route path="/post/:id" exact component={Post}/>
              </div>
            </div>);
  }
}
export default App;