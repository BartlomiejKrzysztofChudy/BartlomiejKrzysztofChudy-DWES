import express from 'express';

const app = express();

app.get('/books',(req, res) => {
    console.log('!!!!!!!!!!!!!');
    res.send("!!!!!!!!!");
});

app.post('/books',(req, res) => {
    console.log('!!!!!!!!!');
    res.send('POST!!!!!!!!');
});

app.use('/authors',(req, res) => {
    console.log('????');
    res.send("?????????");
});

app.use('/resources', express.static('/public'));

app.use((req, res) => {
    console.log('Not Found');
    res.status(404);
    res.send("Not found");
})


app.listen(3000, () => {
    console.log("Servidor disponible")
});