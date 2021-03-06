// import your node modules
const express = require('express');
const server = express();
//server.disable("etag");

const db = require('./data/db.js');

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find()
      .then((posts)=>{
          
        res.json(posts);
      })
      .catch(err => {
          res
            .status(500)
            .json({ error: "The posts information could not be retrieved." });
      });
    
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
      .then((post)=>{
          if(post.length){
            res.json(post);
          } else {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
          }
      })
      .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
      });
    
});


server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  if(!id){
     res
     .status(404)
     .json({message: "The post with the specified ID does not exist."})
  }
  db.remove(id)
      .then((post) => {
          res.json(post);
  })
  .catch( err => {
      res
      .status(500)
      .json({error: 'The post could not be removed', err})
  })
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents }; 
  if(!id){
      res
      .status(404)
      .json({message: "The post with the specified ID does not exist."})
  } else if(!title || !contents){
      res
      status(400)
      .json({errorMessage: "Please provide title and contents for the post."})
  }
  db.update(id, newPost)
  .then(post => {
      res
      .status(200)
      .json(post)
  })
  .catch(err => {
      res
      .status(500)
      .json({error: "The post information could not be modified.", err})
  })
})

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
});

