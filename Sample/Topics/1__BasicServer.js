const http = require('http')

const server = http.createServer((request, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/plain')
    response.end('Hello World')
})

server.listen(4000, '127.0.0.1', () => {
    console.log("Server running on port 3000")
})