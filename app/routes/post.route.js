module.exports=app=>{
    const posts=require('../controllers/post.controller');

    const router=require('express').Router();

//create a new post
router.post('/',posts.create);

// Retrieve all post
router.get('/',posts.findAll);

// Retrieve all published posts
router.get("/published", posts.findAllPublished);

// Retrieve a single post with id
router.get("/:id", posts.findOne);

// Update a post with id
router.put("/:id", posts.update);

// Delete a post with id
router.delete("/:id", posts.delete);

// Delete all posts
router.delete("/", posts.deleteAll);

app.use('/api/posts', router);
}
