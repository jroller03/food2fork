export class Foods {

  constructor(search) {
    this.search = search;
  }

  searchFoods() {
    let xml = new XMLHttpRequest();
    let url = `http://food2fork.com/api/search?key=652282850d8832061fa94909007a95f6&q=` + this.search;
    xml.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 2000) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    xml.open("GET",url,true);
    xml.send();


  }
}
