import * as JsonPlaceholderClient from '../services/jsonplaceholder-client.js';

export async function posts(req, res) {
    try {
        const data = await JsonPlaceholderClient.listarPosts();
        return res.json(data);
    } catch (error) {
        return res.status(502).json({
            error: 'Error consultando JSONPlaceholder',
            detail: error?.message
        });
    }
}

export async function postPorId(req, res) {
    try {
        const { id } = req.params;
        const data = await JsonPlaceholderClient.obtenerPost(id);
        return res.json(data);
    } catch (error) {
        return res.status(502).json({
            error: 'Error consultando JSONPlaceholder',
            detail: error?.message
        });
    }
}

export async function actualizarPost(req, res) {
    try {
        const { id } = req.params;
        const data = await JsonPlaceholderClient.actualizarPost(id, req.body ?? {});
        return res.json(data);
    } catch (error) {
        return res.status(502).json({
            error: 'Error consultando JSONPlaceholder',
            detail: error?.message
        });
    }
}

export async function crearPost(req, res) {
    try {
        const data = await JsonPlaceholderClient.crearPost(req.body ?? {});
        return res.status(201).json(data);
    } catch (error) {
        return res.status(502).json({
            error: 'Error consultando JSONPlaceholder',
            detail: error?.message
        });
    }
}

export async function borrarPost(req, res) {
    try {
        const { id } = req.params;
        const data = await JsonPlaceholderClient.borrarPost(id);
        return res.json(data);
    } catch (error) {
        return res.status(502).json({
            error: 'Error consultando JSONPlaceholder',
            detail: error?.message
        });
    }
}
