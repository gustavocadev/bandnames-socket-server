import { randomUUID } from 'crypto';

class Band {
  name: string;
  votes: number;
  id: string;
  constructor(name: string) {
    this.id = randomUUID();
    this.name = name;
    this.votes = 0;
  }
  get bandId() {
    return this.id;
  }
  set quantityOfVotes(votes: number) {
    this.votes = votes;
  }
}

export default Band;
