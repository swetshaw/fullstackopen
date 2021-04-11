import React from 'react';

const BlogForm = (props) => {
  return (
    <div>
      <div>
        Title :{' '}
        <input type='text' onChange={props.changeTitle} value={props.title} />
      </div>
      <div>
        Author :{' '}
        <input type='text' onChange={props.changeAuthor} value={props.author} />
      </div>
      <div>
        URL : <input type='text' onChange={props.changeUrl} value={props.url} />
      </div>
      <div>
          <button type="submit" onClick={props.handleCreate}> Create </button>
      </div>
    </div>
  );
};

export default BlogForm;
