import axios from 'axios';
export default class SearchArt {
  constructor(query,p=1,ps=10){

        this.query = query;
        this.P=p;
        this.Ps=ps;

    }
    async  getResults(){
        const key='EwntSymw'
        try{
        const res =  await axios(`https://www.rijksmuseum.nl/api/en/collection/?key=${key}&s=${this.query.option}&p=${this.P}&ps=${this.Ps}&q=${this.query.search}&imgonly=True`);
        console.log(res);
        this.result = res.data.artObjects;
        this.count = res.data.count;
        }catch(error){
            alert(error);
        }
    }
}
