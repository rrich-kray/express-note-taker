const fs = require('fs')
const path = require('path')

const validateTaskInput = (task) => {
    if (!task || typeof task !== 'string') return false
}

module.exports = { validateTaskInput }