import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: ""
  })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const userCredential = JSON.parse(loggedUserJSON)
      setUser(userCredential)
      blogService.setToken(userCredential.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      blogService.getAll().then(blogs => setBlogs(blogs))
        .catch(error => console.error(error));
    }
  }, [user]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const userCredential = await loginService.login({ username, password})
  
      localStorage.setItem('loggedInUser', JSON.stringify(userCredential))
      blogService.setToken(userCredential.token)
      setUser(userCredential)
      setUsername('')
      setPassword('')
    } catch(error) {
      console.error(error)
      setError(error);
    }
  } 

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const formDataToSend = {
        title: formData.title,
        author: formData.author,
        url: formData.url
      };
  
      const response = await blogService.createBlog(formDataToSend);
      const newBlog = response.data;

      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setSuccess(`a new blog ${formData.title} by ${formData.author} added`)
      setFormData({
        title: "",
        author: "",
        url: ""
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <p>{error}</p>
      <form onSubmit={handleLogin}>
        <label>username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <br />
        <label>password</label>
        <input 
          type="password" 
          value={password}  
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )



  const blogDetail = () => (
    <div>
    <h2>blogs</h2>
    <p>{success}</p>
    {blogs.map(blog =>
      <Blog 
        key={blog._id} 
        blog={blog} 
      />
    )}
    <h2>Create new</h2>
    <BlogForm
      titleData={formData.title}
      authorData={formData.author}
      urlData={formData.url}
      inChange={handleFormData}
      inSubmit={handleFormSubmit}
    />
  </div>
  )

  return (
    <div>
      { user === null && loginForm() }
      { user !== null && blogDetail() }
    </div>
  )
}

export default App;
