const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const apiRoutes = require('./routes/apiRoutes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes')

// app.get('/api/notes', (req, res) => {
//     res.send("cats")
// })
app.use('/api', apiRoutes)
app.use('/', htmlRoutes) // These have to be in a certain order or else they will not read properly

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})