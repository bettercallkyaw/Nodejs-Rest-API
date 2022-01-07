const sql=require('./db');

const Post=function(post){
    this.title=post.title;
    this.description=post.description;
    this.published=post.published
}

//create a new post
Post.create=(newPost,result)=>{
    sql.query('INSERT INTO posts SET ?',newPost,(err,res)=>{
        if(err){
            console.log('error: ',err);
            result(err,null);
            return;
        }
        console.log('created post: ',{id:res.insertId,...newPost});
        result(null,{id:res.insertId,...newPost});
    });
};

//find a post by Id
Post.findById=(id,result)=>{
    sql.query(`SELECT * FROM posts WHERE id =${id}`,(err,res)=>{
        if(err){
            console.log('error: ',err);
            result(err,null);
            return;
        }

        if(res.length){
            console.log('found post: ',res[0]);
            result(null,res[0]);
            return;
        }

        //not found post with the id
        result({kind:'not_found'},null);
    });
}

// get all Posts
Post.getAll=(title,result)=>{
    let query = "SELECT * FROM posts";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
}

// get all published Posts
Post.getAllPublished=result=>{
    sql.query('SELECT * FROM posts WHERE published=true',(err,res)=>{
        if(err){
            console.log('error: ',err);
            result(null,err);
            return;
        }
        console.log('posts: ',res);
        result(null,res);
    });
}

// update a Post by id

Post.updateById=(id,post,result)=>{
    sql.query(
        'UPDATE posts SET title=?,description=?,published=? WHERE id=?',
        [post.title,post.description,post.published,id],
        (err,res)=>{
            if(err){
                console.log('error: ',err);
                result(null,res);
                return;
            }

            if(res.effectedRows == 0){
                //not found post with the id
                result({kind:'not_found'},null);
                return;
            }
            console.log('update post: ',{id:id,...post});
            result(null,{id:id,...post});
        }
    );
}

// remove a Post
Post.remove=(id,result)=>{
    sql.query('DELETE FROM posts WHERE id=?',id,(err,res)=>{
        if(err){
            console.log('error: ',err);
            result(null,err);
            return;
        }

        if(res.effectedRows == 0){
            //not found post with the id
            result({kind:'not_found'},null);
            return;
        }
        console.log('deleted post with the id: ',id);
        result(null,res);
    });
}

// remove all Posts
Post.removeAll=result=>{
    sql.query('DELETE FROM posts',(err,res)=>{
        if(err){
            console.log('error: ',err);
            result(null,res);
            return;
        }
        console.log(`deleted ${res.effectedRows} posts`);
        result(null,res);
    });
}

module.exports=Post;