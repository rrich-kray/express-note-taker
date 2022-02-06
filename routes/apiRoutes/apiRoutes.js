const router = require('express').Router()
const data = require('../../db/db.json')
const path = require('path')
const fs = require('fs')

// route that returns data from the db.json file
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err; 
        else {
            const parsedTaskData = JSON.parse(data) // parse the data, then send it in JSON format
            res.json(parsedTaskData)
        }
    });
})

router.post('/notes', (req, res) => { 
    // every time you make a request, you must return a response
    fs.readFile('./db/db.json', (err, data) => { // data is read from db.json
        if (err) throw err;
        else {
            const newTask = req.body // request body is assigned to the newTask variable
            newTask.id = data.length; // Assigns a unique id property to the newTask variable that is referenced when deleting a task. Assigning the length of the tasks array as the id ensures id is unique for each newly created task
            const parsedTaskData = JSON.parse(data) // db.json data is parsed using JSON.parse 
            parsedTaskData.push(newTask) // new task is pushed into parsedTaskData

            fs.writeFile('./db/db.json', JSON.stringify(parsedTaskData), (err) => { // data with newly-added task is rewritten into db.json
                err ? console.log(err) : `${newTask} has been written to the database file`
                res.send("Added!") 
            })
        }
    })
})

// use colon for parameters
router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err; // this returns the err, so an else statement is not necessary
        let tasks = JSON.parse(data);
        let filteredTaskIndex = tasks.indexOf(tasks.filter(task => task.id === req.params.id)) //task is filtered by its id, and its index is assigned to the filteredTaskVariable
        tasks.splice(filteredTaskIndex, 1) // filteredTaskINdex is then used to remove the target task from db.json using the Array.splice method. Slice does not modify the original array. Splice does
        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(tasks), (err) => { // Data is then rewritten into db.json
            err ? console.log("Error writing information to database file") : console.log('Task successfully removed')
            res.send('Note deleted!')
        })
    })
})

// local file system is completely different from that in Heroku, so this is not the best method. You want to think about it in terms of how it is hosted. sendFile will only accept absolute paths

module.exports = router