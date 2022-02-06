const router = require('express').Router()
const data = require('../../db/db.json')
const path = require('path')
const fs = require('fs')

router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        else {
            const parsedTaskData = JSON.parse(data)
            res.json(parsedTaskData)
        }
    });
})

router.post('/notes', (req, res) => { // we know it's imported because it returns a boolean
    // every time you make a request, you must return a response
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        else {
            const newTask = req.body
            newTask.id = data.length;
            const parsedTaskData = JSON.parse(data)
            parsedTaskData.push(newTask)

            fs.writeFile('./db/db.json', JSON.stringify(parsedTaskData), (err) => { // local file system is completely different from that in Heroku, so this is not the best method. You want to think about it in terms of how it is hosted. sendFile will only accept absolute paths
                err ? console.log(err) : `${newTask} has been written to the database file`
                res.send("Added!")
            })
        }
    })
})

router.delete('/notes/:id', (req, res) => { // use colon for parameters
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let tasks = JSON.parse(data);
        console.log("pre-splice", tasks)
        let filteredTaskIndex = tasks.indexOf(tasks.filter(task => task.id === req.params.id))
        tasks.splice(filteredTaskIndex, 1) // slice does not modify the original array. Splice does
        console.log("post-splice", tasks)
        // else tasks = tasks.slice(0, filteredTaskIndex - 1) + tasks.slice(filteredTaskIndex + 1)
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(tasks), (err) => {
            err ? console.log("Error writing information to database file") : console.log('Task successfully removed to file')
            res.send('Note deleted!')
        })


    })
})

// endpoint for /notes and /index.html

module.exports = router