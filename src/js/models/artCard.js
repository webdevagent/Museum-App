import axios from 'axios';
export default class ArtCard {
  constructor(id) {
    this.id = id;
  }
  async getResults() {
    const key = 'EwntSymw'
    try {
      const res = await axios(`https://www.rijksmuseum.nl/api/en/collection/${this.id}?key=${key}`);
      this.result = res.data.artObject;
      console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}
