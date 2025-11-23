export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;
    
    res.status(status).json({
        code: status,
        error: "Internal Server Error", 
        message: err.message
    });
};