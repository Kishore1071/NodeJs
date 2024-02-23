const express = require('express')
const app = express()
const PORT = 4000

app.listen(PORT, () => {
    console.log(`Express app is running on the port ${PORT}`)
})