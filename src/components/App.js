import React, { Component } from 'react';
import {Route,Switch,Link} from 'react-router-dom';
import Category from './Category'
import PostList from './PostList'
import PostEdit from './PostEdit'
import Post from './Post'
const NoMatch = ({ location }) => (
  <div>
    <h3>404</h3>
    <h4><Link to={"/"}>GO HOME</Link></h4>
  </div>
)
class App extends Component { 
  render() {
    return (<div>
    		  <header className="navbar navbar-inverse">
              <Category />
    		  </header>
            <div className="container">
            <Switch>
              <Route path="/" exact component={PostList}/>
              <Route path="/add" exact component={PostEdit}/>
              <Route path="/:categoryId" exact component={PostList}/>
              <Route path="/:categoryId/:id/edit" exact component={PostEdit}/>
              <Route path="/:categoryId/:id" exact component={Post}/>
              <Route component={NoMatch}/>
            </Switch>
            </div>
          </div>);
  }
}
export default App;