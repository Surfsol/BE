const router = require('express').Router()
const SubModel = require('./sub-model')

const {authenticate} = require('../../auth/auth-middleware')

router.get('/', authenticate,(req, res)=>{
    SubModel.find()
    .then(subs => {
        res.json(subs)
    })
    .catch(err => res.send(err))
})

router.post('/new', authenticate, (req, res)=> {
    let newSub = req.body

    SubModel.add(newSub)
        .then(saved => {
            res.status(201).json({saved})
        })
})
module.exports = router