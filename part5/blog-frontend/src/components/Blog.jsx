const Blog = ({ blog, onLogout }) => (
  <div>
    <p>{blog.author} logged in</p>
    <p>{blog.title}</p>
  </div>  
)

export default Blog