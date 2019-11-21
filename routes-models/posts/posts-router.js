const router = require('express').Router()
const PostModel = require('./posts-model')
const UsersModel = require('../users/users-model')

router.get('/', (req, res)=>{
    PostModel.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    PostModel.findById(req.params.id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/new', (req, res)=> {
    let newPost = req.body

    PostModel.add(newPost)
        .then(saved => {
            res.status(201).json({post: saved})
        })
})

router.put('/:id/:postid', (req, res) => {
    const id = req.params.id
    const postid = req.params.postid
    const changes = req.body

    UsersModel.findById(id)
    .then(user => {
        if (user) {
            PostModel.findPostById(postid)
            .then(post => {
                if (post) {
                PostModel.update(changes, id)
                .then(updated => {
                    res.json(updated)
                })
                } else {
                    res.status(404).json({message: "Could not find post"})
                }
            })
            .catch (err => {
                res.status(500).json({message: 'Failed to update post.', err})
            })
        } else {
            res.status(404).json({message: "Could not find user"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to find user and update post', err})
    })
})


router.delete('/:id/:postid', (req, res) => {
    const id = req.params.id;
    const postid = req.params.postid

    UsersModel.findById(id)
    .then(user => {
        if (user) {
            PostModel.remove(postid)
            .then(deleted => {
                if(deleted){
                    res.json({removed: deleted})
                } else {
                    res.status(404).json({message: 'Could not find post.'})
                }
            })
            .catch(err => {
                res.status(500).json({message: 'Failed to delete post.', err})
            })
        } else {
            res.status(404).json({message: "Could not find user"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete the post based on user ID', err})
    })
})  

module.exports = router