import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        Title :{' '}
        <input
          type='text'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
          value={newBlog.title}
        />
      </div>
      <div>
        Author :{' '}
        <input
          type='text'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
          value={newBlog.author}
        />
      </div>
      <div>
        URL :{' '}
        <input
          type='text'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
          value={newBlog.url}
        />
      </div>
      <div>
        <button type='submit'> Create </button>
      </div>
    </form>
  );
};

export default BlogForm;
