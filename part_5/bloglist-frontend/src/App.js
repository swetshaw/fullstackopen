import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    console.log('loggedbloguser', loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log('User', user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMsg('Wrong Credentials');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    // event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser');
    window.location.reload();
  };

  const handleBlog = async (blogObject) => {
    console.log('Blog create button clicked');
    const newBlog = await blogService.createBlog(blogObject);
    blogFormRef.current.toggleVisibility();

    setMsg(`a new blog ${title} by ${author} added!!`);
    setTimeout(() => {
      setMsg(null);
    }, 5000);
    setBlogs(blogs.concat(newBlog));
  };

  if (user === null) {
    return (
      <div>
        <Notification msg={msg} errorMsg={errorMsg} />
        <Togglable>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification msg={msg} errorMsg={errorMsg} />
      <p>{user.name} logged in</p>
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
      <br></br>
      <br></br>
      <Togglable buttonLabel='Create' ref={blogFormRef}>
        <BlogForm createBlog={handleBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
