const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')){
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = await jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  try {
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove();
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
