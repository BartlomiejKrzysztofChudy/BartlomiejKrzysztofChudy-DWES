import * as JsonPlaceholderCore from './jsonplaceholder-core.js';

export function listarPosts() {
    return JsonPlaceholderCore.get('/posts');
}

export function obtenerPost(id) {
    return JsonPlaceholderCore.get(`/posts/${id}`);
}

export function actualizarPost(id, body) {
    return JsonPlaceholderCore.put(`/posts/${id}`, body);
}

export function crearPost(body) {
    return JsonPlaceholderCore.post('/posts', body);
}

export function borrarPost(id) {
    return JsonPlaceholderCore.del(`/posts/${id}`);
}
