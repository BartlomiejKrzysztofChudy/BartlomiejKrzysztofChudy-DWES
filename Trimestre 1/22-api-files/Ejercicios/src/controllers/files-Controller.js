import path from 'node:path'

export const uploadFiles = (req, res) => {
    console.log(req.body);
    console.log(req.files);

    res.json({
        message: 'Archivos subidos correctamente'
    });
}

export const downloadFile = (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(process.cwd(), 'files', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error al enviar el archivo:', err);
            if (err.code === 'ENOENT') { 
                res.status(404).json({ message: 'Archivo no encontrado.' });
            } else {
                res.status(500).json({ message: 'Error interno del servidor.' });
            }
        } else {
            console.log(`Archivo ${filename} enviado exitosamente.`);
        }
    });
};