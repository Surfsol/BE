const router = require('express').Router()
const PostModel = require('./posts-model')

router.get('/', (req, res)=>{
    PostModel.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => res.send(err))
})

router.post('/new', (req, res)=> {
    let newPost = req.body

    PostModel.add(newPost)
        .then(saved => {
            const first = saved[0]
            res.status(201).json({post: first})
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const change = req.body

    PostModel.findById(id)
    .then(post => {
        if (post) {
        PostModel.update(change, id)
        .then(updated => {
            res.json(updated)
        })
        } else {
            res.status(404).json({message: "Could not find post"})
        }
    })
    .catch (err => {
        res.status(500).json({message: 'Failed to update post.'})
    })
})


router.delete('/:id', (req, res) => {
    const {id} = req.params;

    PostModel.remove(id)
    .then(deleted => {
        if(deleted){
            res.json({removed: deleted})
        } else {
            res.status(404).json({message: 'Could not find post.'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Failed to delete post.'})
    })

})  

module.exports = router