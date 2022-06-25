import Band from './band';

class BandList {
  #bands: Band[];
  constructor() {
    this.#bands = [
      new Band('Metallica'),
      new Band('Iron Maiden'),
      new Band('AC/DC'),
      new Band('Pink Floyd'),
    ];
  }

  addBand(name: string) {
    const newBand = new Band(name);
    const updatedBands = [...this.#bands, newBand];
    this.#bands = updatedBands;
    return this.#bands;
  }

  removeBand(id: string) {
    const updatedBands = this.#bands.filter((band) => band.id !== id);
    this.#bands = updatedBands;
  }
  get bands() {
    return this.#bands;
  }

  increaseVotes(id: string) {
    const updatedBands = this.#bands.map((band) => {
      if (band.id !== id) return band;
      return {
        ...band,
        votes: band.votes + 1,
      };
    }) as Band[];
    this.#bands = updatedBands;
  }

  changeBandName(name: string, id: string) {
    const updatedBands = this.#bands.map((band) => {
      if (band.id !== id) return band;
      return {
        ...band,
        name,
      };
    }) as Band[];
    this.#bands = updatedBands;
  }
}

export default BandList;
