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

router.post('/new', (req, res)=> {
    let newPost = req.body

    PostModel.add(newPost)
        .then(saved => {
            res.status(201).json({post: saved})
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


// router.post('/:userid/favs', (req, res) => {
//     const{userid} = req.params
//     return UsersModel.findById(userid)
//         .then(founduser => {
//             PostModel.add(founduser.id, postid)
//             .then(response => {
//                 // console.log(response)
//                 res.status(201).json({success: true, message: 'Record added successfully!'})
//             })
//             .catch(err => {
//                 // console.log(err) 
//                 res.status(400).json({message: `It appears ${founduser.username} has already favorited the record with id of: ${postid}!` })
//             })
//         })
//         .catch(err => {
//             // console.log(err)
//             res.status(418).json({message: 'awww nahh now ya gone and done it!', error: err.message})
//         })
// })

// GET USER SPECIFIC FAVORITES
// router.get('/users/:userid/favs', (req, res) => {
//     const userid = req.params.userid
//     usersdb.getuserbyid(userid)
//     .then(founduser => {
//         // console.log(founduser)
//         PostModel.getFavoritesByUserID(userid)
//         .then(response => {
//             // console.log('I AM FROM THE FAVORITES GETTER',response)
//             res.status(200).json({loggedInUser: founduser.id, response})
//         })
//         .catch(err => {
//             // console.log(err) 
//             res.status(400).json({message: 'Not a valid user id!'}, err)
//         })
//     })
//     .catch(err => {
//         // console.log(err)
//         res.status(418).json({message: 'failed to retrieve data!', error: err.message})
//     })
// })

// //  GET ALL FAVORITES
// router.get('/favs', (req, res) => {
//     favoritesdb.getAllFavorites()
//     .then(response => {
//         // console.log('I AM FROM THE FAVORITES GETTER',response)
//         res.status(200).json(response)
//     })
//     .catch(err => {
//         // console.log(err)
//         res.status(418).json({message: 'awww nahh now ya gone and done it!', error: err.message})
//     })
// })

// // DELETE A DAMN FAVORITE!!  
// router.delete('/users/:userid/favs/:reviewid/remove', (req, res) => {
//     const {userid, reviewid} = req.params
//     favoritesdb.removeFavorite(userid, reviewid)
//     .then(deleted => {
//         res.status(200).json({success: true, deleted})
//     })
//     .catch(err => {
//         res.status(204).json({success: false, error: err.message})
//     })
// })

module.exports = router