const http = require('http')

const server = http.createServer((request, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html')
    response.end('<h1>Javascript the web language</h1>')
})

server.listen(4000, '127.0.0.1', () => {
    console.log("Server running on port 3000")
})