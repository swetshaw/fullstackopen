import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setErrorMsg] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    console.log("loggedbloguser", loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log("User", user);
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token)
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMsg('Wrong Credentials');
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    }
  };

  const changeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleLogout = (event) => {
    // event.preventDefault()

    window.localStorage.removeItem('loggedBlogUser');
    window.location.reload();
  };

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log("Blog create button clicked");
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const newBlog = await blogService.createBlog(blogObject)
    setBlogs(blogs.concat(newBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username :
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password :
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button type='submit' onClick={handleLogout}>
        Logout
      </button>
      <br></br>
      <br></br>
      <BlogForm
        author={author}
        title={title}
        url={url}
        changeAuthor={changeAuthor}
        changeTitle={changeTitle}
        changeUrl={changeUrl}
        handleCreate = {handleCreate}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
