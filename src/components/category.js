import React from 'react'
import {Link} from 'react-router-dom';
class Category extends React.Component {
  s
  render() {
    const { categories } = this.props
    return (
    <div className="list-books">
        {categories.map((category)=>{
          <li>{category.name}</li>
        })}
    </div>
    )
  }
}

export default Category