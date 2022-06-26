import express from 'express';
import type { Express } from 'express';
import Socket from './sockets/sockets.controller';
import * as SocketIO from 'socket.io';
import helloRoute from './routes/hello.routes';
import http from 'http';
import cors from 'cors';

class Server {
  #app: Express;
  #port: number;
  #io: SocketIO.Server;
  #server: http.Server;
  constructor() {
    this.#app = express();

    this.#server = http.createServer(this.#app);

    this.#io = new SocketIO.Server(this.#server);
    this.#port = Number(process.env.PORT) ?? 4000;

    // execute all functions
    this.middlewares();
    this.sockets();
    this.routes();
  }

  middlewares() {
    this.#app.use(express.json());
    // cors
    this.#app.use(cors());
    this.#app.use(express.urlencoded({ extended: true }));
    // static
    this.#app.use(express.static('public'));
  }
  sockets() {
    new Socket(this.#io);
  }
  routes() {
    this.#app.use('/', helloRoute);
  }
  listen() {
    this.#server.listen(this.#port, () => {
      console.log(`Server is running on port ${this.#port} 🎉`);
    });
  }
}

export default Server; // to export the class
