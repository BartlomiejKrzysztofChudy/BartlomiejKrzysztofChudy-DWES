const JSONPLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com';

const headers = {
    'Content-Type': 'application/json; charset=UTF-8'
};

async function sendRequest(endpoint, options = {}) {
    const {
        method = 'GET',
        body
    } = options;

    const requestOptions = {
        method,
        headers
    };

    if (body !== undefined) {
        requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${JSONPLACEHOLDER_BASE_URL}${endpoint}`, requestOptions);

    const raw = await response.text();

    let data;
    try {
        data = raw ? JSON.parse(raw) : null;
    } catch {
        data = raw;
    }

    if (!response.ok) {
        const detail = typeof data === 'string' ? data : JSON.stringify(data);
        throw new Error(`JSONPlaceholder API error ${response.status}: ${detail}`);
    }

    return data;
}

export function get(endpoint) {
    return sendRequest(endpoint, { method: 'GET' });
}

export function post(endpoint, body) {
    return sendRequest(endpoint, { method: 'POST', body });
}

export function put(endpoint, body) {
    return sendRequest(endpoint, { method: 'PUT', body });
}

export function patch(endpoint, body) {
    return sendRequest(endpoint, { method: 'PATCH', body });
}

export function del(endpoint) {
    return sendRequest(endpoint, { method: 'DELETE' });
}
