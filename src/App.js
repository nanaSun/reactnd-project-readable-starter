import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Category} from 'components/category'
import {getCategories} from 'utils/api'
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
  	const {categories}=this.state
    return (
      <div className="container">
		<Route path="/categories" exact render={({history})=>(
			<Category categories={categories}/>
			)}
		/>
      </div>
    );
  }
}
export default App