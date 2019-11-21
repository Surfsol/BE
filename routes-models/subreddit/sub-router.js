const router = require('express').Router()
const SubModel = require('./sub-model')

const {authenticate} = require('../../auth/auth-middleware')

router.get('/', authenticate,(req, res)=>{
    SubModel.find()
    .then(subs => {
        res.status(200).json(subs)
    })
    .catch(err => res.send(err))
})

router.get('/:id', authenticate, (req, res) => {
    SubModel.findById(req.params.id)
    .then(sub => {
        res.status(200).json(sub)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/new', authenticate, (req, res)=> {
    let newSub = req.body

    SubModel.add(newSub)
    .then(saved => {
        res.status(201).json({saved})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router