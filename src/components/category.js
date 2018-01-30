import React from 'react'
import {Link} from 'react-router-dom';
import {getCategories} from '../utils/api'
import { CSSTransition } from 'react-transition-group'

const Slide = ({ children, ...props }) => (
  <CSSTransition 
    {...props}
    classNames="slide"
    timeout={{
       enter: 1000
    }}
  >{children}</CSSTransition>
)

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      categories:[],
      show:false
    }
    this.handleToggle.bind(this)
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
  handleToggle() {
    this.setState(({ show }) => ({
      show: !show
    }))
  }
  componentWillMount = () => {
    this.getAllCategories()
  }
  render() {
    const { categories,show } = this.state
    return (
    <Slide in={this.state.show}>
        <div className="category-menu  slide-exit slide-exit-active ">      
          <ul>
            <li><Link to={'/'}>home</Link></li>
            {categories.map((category)=>(
            <li key={category.path}><Link to={'/'+category.path}>{category.name}</Link></li>
            ))}
          </ul>
          <button onClick={() => this.handleToggle()}>
              <i></i>
              <i></i>
              <i></i>
          </button>
        </div>
    </Slide>
    )
  }
}

export default Category