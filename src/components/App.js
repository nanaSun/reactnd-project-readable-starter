import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import Post from './Post'

class App extends Component { 
  render() {
    return (<div>
    		  <header className="navbar navbar-inverse">
              <Category />
    		  </header>
            <div className="container">
              <Route path="/" exact component={PostList}/>
              <Route path="/:categoryId" exact component={PostList}/>
              <Route path="/post/:id" exact component={Post}/>
            </div>
          </div>);
  }
}
export default App;