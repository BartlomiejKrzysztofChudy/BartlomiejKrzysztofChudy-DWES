import morgan from 'morgan';


import router from './routes/index.js';
import { errorHandler, logRequestMiddleware } from './middlewares/basic-middleware.js';

import { init } from './loaders/index.js';

export default function expressLoader (app, config){
    init(app, config);
    
    app.use(morgan(':method :url :status :response-time ms'));
    app.use(logRequestMiddleware);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(router);
    
    app.use(errorHandler);
} 