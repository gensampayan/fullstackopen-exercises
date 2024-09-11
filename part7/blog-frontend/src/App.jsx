import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setAllBlogs, newCreateBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedInUser");

    if (loggedUserJSON) {
      const userCredential = JSON.parse(loggedUserJSON);
      setUser(userCredential);
      blogService.setToken(userCredential.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
      dispatch(setAllBlogs());
    }
  }, [user]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await loginService.login({ username, password });

      localStorage.setItem("loggedInUser", JSON.stringify(userCredential));
      blogService.setToken(userCredential.token);
      setUser(userCredential);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const formDataToSend = {
        title: formData.title,
        author: formData.author,
        url: formData.url,
      };

      const response = dispatch(newCreateBlogs(formDataToSend))
      const newBlog = response.data;
      console.log(newBlog);

      setBlogs((prevBlogs) => [...prevBlogs, ...newBlog]);
      setSuccess(`a new blog ${formData.title} by ${formData.author} added`);
      setFormData({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleLike = async (blog) => {
    try {
      const updateBlogData = {
        ...blog,
        likes: (blog.likes || 0) + 1,
      };

      const response = await blogService.updateBlog(blog.id, updateBlogData);
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...response, user: blog.user } : b,
        ),
      );
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.removeBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
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
          data-testid="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>password</label>
        <input
          type="password"
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogDetail = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
      <div>
        <h2>blogs</h2>
        <p>{success}</p>

        {sortedBlogs.map((blog, index) => (
          <Blog
            key={index}
            blog={blog}
            onLike={() => handleLike(blog)}
            onRemove={() => handleRemove(blog)}
            data-testid="blogs"
          />
        ))}

        <h2>Create new</h2>
        <Togglable buttonHideLabel="New blog" buttonShowLabel="Cancel">
          <BlogForm
            titleData={formData.title}
            authorData={formData.author}
            urlData={formData.url}
            inChange={handleFormData}
            inSubmit={handleFormSubmit}
          />
        </Togglable>
      </div>
    );
  };

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogDetail()}
    </div>
  );
};

export default App;
