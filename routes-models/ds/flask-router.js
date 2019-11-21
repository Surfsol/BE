const router = require('express').Router();
const axios = require('axios');

router.post('/', (req, res) => {
  requestOptions = req.body
 
console.log(requestOptions)
  axios
    .post('https://davidanagy-posthere-flask.herokuapp.com', requestOptions)
    .then(response => {
      res.status(200).json(response)
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Suggested Subreddits', error: err });
    });
});
})

module.exports = router