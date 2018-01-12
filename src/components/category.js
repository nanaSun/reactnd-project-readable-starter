import React from 'react'
import {Link} from 'react-router-dom';
import {getCategories} from '../utils/api'

class Category extends React.Component {
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
    const { categories } = this.state
    return (
    <ul className="list-books">
        {categories.map((category)=>(
          <li key={category.path}><Link to={'/'+category.path}>{category.name}</Link></li>
        ))}
    </ul>
    )
  }
}

export default Category