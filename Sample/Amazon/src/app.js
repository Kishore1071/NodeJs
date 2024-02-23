const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.send("HI")
})

app.post('/', (request, response) => {
    console.log(request.body)
    response.send(request.body)
}) 

app.listen(PORT, () => {
    console.log(`Express app is running on the port ${PORT}`)
})