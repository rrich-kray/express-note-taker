const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => { // returns index.html when '/' route is requested
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

router.get('/notes', (req, res) => { // returns notes.html when '/notes' route is requested
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
})

router.get('*', (req, res) => { // returns index.html when user attempts to access any route aside from the two above
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

module.exports = router

