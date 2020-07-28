const express = require('express');

const router = express.Router()
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

router.post('/quotes', (req, res) => {
    console.log(req.body)
    visionCollection.insertOne(req.body)
    .then(res => {
        console.log(res)
    })
})

module.exports = router;