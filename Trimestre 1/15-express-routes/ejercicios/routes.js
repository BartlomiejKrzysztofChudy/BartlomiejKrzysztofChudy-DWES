export function configureRoutes(app) {

  app.get('/header', (req, res) => {
    const token = req.headers['token'] || req.query.token;

    if (!token) {
      return res.status(401).json({code: 401, error: "Unauthorized", message: "Error: Set a token to login"});
    }

    console.log("Token recibido:", token);
    res.json({ message: "Token recibido correctamente",token });
    
  });

 // Ejercicio 2
  app.get('/params/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hola ${name}`);
  });

 // Ejercicio 3
 app.get('/query', (req, res) =>{

  const  {numeroRecibido = 100} = req.query;
  let suma = 0;
  
  for(let i = 0; i < numeroRecibido; i++){

    suma += i;
  }
  res.end(`La suma del numero intruducido es de ${suma}`)

 });
}
