import { fibonacci } from "../utils/fibonacci.js";

export const getFibonacci = (req, res) => {
    const n = Number.parseInt(req.query.n || req.params.n);

    if (isNaN(n)) {
        return res.status(400).json({error: "Introduce un número válido."});
    }
    const resultado = fibonacci(n);

    return res.status(200).json({
        numero: n,
        fibonacci: resultado
    });
};