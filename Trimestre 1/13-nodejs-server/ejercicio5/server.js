import http from 'node:http';
import fs from 'node:fs';

const server = http.createServer((req, res) =>{
    
    res.setHeader('Content-Type', 'text/html')
    let file = './principal.html';

    if (req.url === '/error') {
        file = './error.html';
        res.statusCode = 404;
    }else{
        res.statusCode = 202;
    }

     fs.readFile(file, (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end('<h1>Error del servidor</h1>')
        } else {
            res.end(data)
        }
    })
})

server.listen(3400, () => {
    console.log('Servidor en http://localhost:3400')
})