export function resolveCommand(command) {
    if (!command) return null;
    const normalized = command.trim().toLowerCase();
    const map = {
        '1': 'CREATE', 'crear': 'CREATE', 'c': 'CREATE',
        '2': 'EDIT', 'editar': 'EDIT', 'e': 'EDIT',
        '3': 'DELETE', 'eliminar': 'DELETE', 'borrar': 'DELETE',
        '4': 'EXIT', 'salir': 'EXIT', 's': 'EXIT'
    };
    return map[normalized];
}
