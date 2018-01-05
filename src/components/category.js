import React from 'react'
import {Link} from 'react-router-dom';
class Category extends React.Component {
  render() {
    const { categories } = this.props
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