import http from 'node:http';
const PORT = 3200;

const server = http.createServer((req, res) =>{
    res.setHeader('Content-type', 'text/html')
    
    if (req.url === '/') {
        res.end(`<h1>Bienvenido a mi servidor</h1>`);

    }else if (req.url === '/page') {
        res.end(`<html><body><h1>Pagina Principal</h1></body></html>`)
    } 
    else if(req.url === '/error'){
        res.statusCode = 404;
        res.end('<h1>Error 404</h1>');
    }else{
        res.statusCode = 404;
    }
});
server.listen(PORT, () => {
  console.log(`Servidor en marcha http://localhost:${PORT}`);
});