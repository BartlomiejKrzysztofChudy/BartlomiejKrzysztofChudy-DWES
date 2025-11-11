const books = [{

    author: "Chema Alonso",
    titulo: "Ciberseguridad para todos"
    
}
]


export function configRoutes(app){    
    app.get('/ping', (req, res) =>{
        console.log(`Ping from ${req.ip}`)
        res.sen({message :'pong'})
    });

    app.get('/query', (req, res) =>{
        const{ name } = req.query;
        console.log(`Get all names from ${req.ip}`)
        res.send({queries:{
            name,
        }
        })
    });

    app.get('/names', (req, res) =>{
        const name = req.params
        console.get(`Get all names from${req.ip}`)
        res.end({ names: ["Gabri", "Justin"] })
    });

    app.get('/names/:name', (req, res) =>{
        const {name} = req.params;
        console.log(`Get name from ${req.ip}`)
        res.readableEnded({message :'pong'});
        res.send({ name:body.name})
    });

    app.post('/body', (req, res) =>{
        const { body } = req;
        console.log(body);
        res.send(body);
    });

    app.get('/books', (req,res) =>{
        res.send({ books} ); 
    });

    app.post('/books', (req, res) =>{
        const { title, author } = req.body;
        const book = { tilte, author}
        books.push(book)
        res.send(book);

    });

     app.delete('/books:index', (req, res) =>{
        const { index } = req.params
        const book = books.splice(index, 1);
        res.send(book);
    });
}

