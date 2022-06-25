import { Server } from 'socket.io';
import BandList from '../models/band-list';
import { ChangeBandNameParams, CreateNewBandParams } from '../types/types';

class Socket {
  #io: Server;
  #bandList: BandList;
  constructor(io: Server) {
    this.#io = io;
    this.#bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.#io.on('connection', (socket) => {
      console.log('cliente conectado');
      // emitir al cliente conectado todas las bandas actuales
      socket.emit('current-bands', this.#bandList.bands);

      socket.on('vote-band', (id: string) => {
        this.#bandList.increaseVotes(id);
        this.#io.emit('current-bands', this.#bandList.bands);
      });

      socket.on('delete-band', (id: string) => {
        // action: delete-band
        this.#bandList.removeBand(id);

        // emitir a todos los clientes conectados la NUEVA lista de bandas
        this.#io.emit('current-bands', this.#bandList.bands);
      });

      socket.on('change-band-name', ({ id, name }: ChangeBandNameParams) => {
        // action: change-band-name
        this.#bandList.changeBandName(name, id);

        // emitir a todos los clientes conectados la NUEVA lista de bandas
        this.#io.emit('current-bands', this.#bandList.bands);
      });

      socket.on('new-band', ({ name }: CreateNewBandParams) => {
        // action: new-band
        const newBand = this.#bandList.addBand(name);

        // emitir a todos los clientes conectados la NUEVA lista de bandas
        this.#io.emit('current-bands', this.#bandList.bands);
      });
    });
  }
}

export default Socket;
