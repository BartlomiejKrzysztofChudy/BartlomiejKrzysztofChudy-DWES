function piedraPapelTijeras(opcionUsuario = "") {
    const opciones = ["Piedra", "Papel", "Tijeras"];
  
    const opcionOrdenador = opciones[Math.floor(Math.random() * 3)];

    console.log("Tu eleccion es:", opcionUsuario);
    console.log("El ordenador eligió:", opcionOrdenador);

    if (opcionUsuario === opcionOrdenador) {
        console.log("Empate");
        return "Empate";
    } else if (
        (opcionUsuario === "Piedra" && opcionOrdenador === "Tijeras") ||
        (opcionUsuario === "Papel" && opcionOrdenador === "Piedra") ||
        (opcionUsuario === "Tijeras" && opcionOrdenador === "Papel")
    ) {
        console.log("Ganaste");
        return "Ganaste";
    } else {
        console.log("Perdiste.");
        return "Perdiste";
    }
}


piedraPapelTijeras("Piedra");
piedraPapelTijeras("Papel");
piedraPapelTijeras("Tijeras");
