export function accesoConcedido(req, res) {
    res.send("Has entrado");
}

export function publicZone(req, res){
    res.send("Esta es zona publica");
}

export function vipZone(req, res){
    res.send("Esta es zona VIP");
}

export function adminZone(req, res){
    res.send("Esta es zona ADMIN");
}