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
    <Slide in={show}>
          <div className="container">
              <div className="navbar-header">
                <Link to={'/'} className="navbar-brand">My blog</Link>
                <button className="navbar-toggle" onClick={() => this.handleToggle()}>
                    <i></i>
                    <i></i>
                    <i></i>
                </button>
              </div>
              <nav className="navbar-collapse" >
                <ul className="nav navbar-nav">
                <li><Link to={'/'}>home</Link></li>
                {categories.map((category)=>(
                <li key={category.path}><Link to={'/'+category.path}>{category.name}</Link></li>
                ))}
                </ul>
              </nav>
        </div>
    </Slide>
    )
  }
}

export default Category