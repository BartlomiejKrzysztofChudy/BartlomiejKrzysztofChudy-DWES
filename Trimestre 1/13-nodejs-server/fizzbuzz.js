import http from 'node:http';
import querystring  from 'node:querystring'
const PORT = 3800;

const server = http.createServer((req, res) => {
    
    const [path, queryString] = req.url.split('?');
    const queryParams = querystring.parse(queryString);
    const num = parseInt(queryParams.num);

    if (path === '/fizzbuzz') {
    
        if (!num || num <= 0) {
            res.statusCode = 400; 
            res.setHeader('Content-Type', 'text/html; charset=utf-8'); 
            res.end('<h1>Error</h1><p>numero invalido. </p>');
            return; 
        }
        
        let fizzbuzzHtml = `<h1>FizzBuzz hasta el número ${num}</h1>`;

        for (let i = 1; i <= num; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                fizzbuzzHtml += 'FizzBuzz<br>';
            } else if (i % 3 === 0) {
                fizzbuzzHtml += 'Fizz<br>';
            } else if (i % 5 === 0) {
                fizzbuzzHtml += 'Buzz<br>';
            } else {
                fizzbuzzHtml += `${i}<br>`;
            }
        }

        res.end(fizzbuzzHtml);

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>404  Pagina no encontrada</h1>');
    }
});


server.listen(PORT, () => {
    console.log(`Servidor en marcha en http://localhost:${PORT}`);
    console.log(`Prueba a acceder a http://localhost:${PORT}/fizzbuzz?num=20`);
});
