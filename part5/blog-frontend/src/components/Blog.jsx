import Togglable from "./Togglable"
import { forwardRef } from "react"
import PropTypes from 'prop-types'

const Blog = forwardRef(({ blog, onLogout, onLike, onRemove }, ref) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtn = {
    backgroundColor: '#4387F6',
    border: 'none',
    fontWeight: 'bold'
  }
  
  return (
    <div style={blogStyle} ref={ref}>
      <p className="author">{blog.author}</p>
      <p className="title">{blog.title}</p>
      <Togglable 
        buttonHideLabel="view"
        buttonShowLabel="hide"
      >
        <p className="url">{blog.url}</p>
        <p className="likes">
          likes: {blog.likes} <button onClick={onLike}>like</button>
        </p>
        <p>{blog.user?.name || blog.user?.username}</p>
      </Togglable>
      <button 
        style={removeBtn}
        onClick={onRemove}
      >
        remove
      </button>
    </div>  
  );
})

Blog.propTypes = {
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string
    })
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Blog;
