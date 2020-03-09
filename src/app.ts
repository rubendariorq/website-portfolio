import express, { Application } from 'express';
import exphbs from 'express-handlebars';
import path from 'path';

//Import routes
import indexRouter from './routes/index-routes';

export class App {

    private app:Application;
    private port:number;

    constructor(port:number){
        this.app = express();
        this.port = port;

        this.settings();
        this.routes();
        this.static_files();
    }   

    private settings(){
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('hbs', exphbs({
            extname: '.hbs',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            helpers: {
                ifCond: function (v1: any, operator: any, v2: any, options: any) {
                    switch (operator) {
                        case '==':
                            return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        case '===':
                            return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        case '!==':
                            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                        case '<':
                            return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        case '<=':
                            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        case '>':
                            return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        case '>=':
                            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        case '&&':
                            return (v1 && v2) ? options.fn(this) : options.inverse(this);
                        case '||':
                            return (v1 || v2) ? options.fn(this) : options.inverse(this);
                        default:
                            return options.inverse(this);
                    }
                }
            },
            defaultLayout: 'main'
        }));
        this.app.set('view engine', 'hbs');
    }

    private routes(){
        this.app.use('/', indexRouter);
    }

    private static_files(){
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    public async listen(){
        await this.app.listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }
}