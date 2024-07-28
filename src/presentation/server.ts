import express, { Router } from 'express';
import { setupSwagger } from '../config/plugins';

interface Options {
    port: number,
    routes: Router,
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private serverListener?: any;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {

        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;

    }

    async start() {

        // Middlewares
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

        // Static files
        //this.app.use(express.static(this.publicPath));

        // Routes
        this.app.use( this.routes );

        // Swagger Setup
        setupSwagger(this.app);

        // Error Handling Middleware
        //this.app.use(errorHandler);

        // Application
        this.serverListener = this.app.listen( this.port, () => {
            console.log(`server running on port ${ this.port }`);
        });

    }

    public close() {
        this.serverListener?.close();
    }

}