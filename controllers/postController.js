const connection = require('../database/db')

// Array of posts
const blog = require("../data/postsArr");

// Function find
function getFind(id) {
  return blog.find((thisPost) => {
    return thisPost.id === id;
  });
}

// index
function index(req, res) {
  
  const sql = 'SELECT * FROM posts'

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({error: 'Database query failed'})
      res.json(results)
  })
}

// show
function show(req, res) {
  // Transform to number the id of URL
  const id = Number(req.params.id);

  // Find the post with the id that be search
  const specificPost = getFind(id);

  // Controll if the post exist
  if (!specificPost) {
    // Change the status
    res.status(404);

    // Return an error
    return res.json({
      error: "Not found",
      message: "Post not find",
    });
  }

  // Response whit the specific post
  res.json(specificPost);
}

// destroy
function destroy(req, res) {
  const {id} = req.params

  connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if(err) return res.status(500).json({error: 'Failed to delete post'})
      res.status(204)
  })
}

// store
function store(req, res) {
  // New id
  const newId = Date.now();

  // New object post
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  // Add new post
  blog.push(newPost);

  // Control
  console.log(blog);

  // Response status and new post
  res.status(201);
  res.json(newPost);
}

// update
function update(req, res) {
  // Transform in number the URL
  const id = Number(req.params.id);

  // Find the post with the id that be search
  const specificPost = getFind(id);

  // Controll if the post exist
  if(!specificPost) {

    // Change the status
    res.status(404)

    return res.json({
      error: "Not found",
      message: "Post not find"
    })
  }

  // Update the post
  specificPost.title = req.body.title

  // Controll the blog
  console.log(blog)

  // Response with the specific post
  res.json(specificPost)
}

// Export
module.exports = { index, show, destroy, store, update };
