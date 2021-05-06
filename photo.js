class Photo{

  title = "" // string
  thumbnailUrl = ""

  constructor(photo){
      /*
          photo == {title, thumbnailUrl, url, ...}
          OBS! Privata variabler betraktas som undefined i konstruktorn - bugg?
      */
      for(let prop in photo){ // {title, thumbnailUrl, url, ...}      
          if(this[prop] !== undefined){
              this[prop] = photo[prop]
          }
      }
  }

  async render(elementSelector){

      let html = `
          <article>
              <h2>${this.title}</h2>
              <img src="${this.thumbnailUrl}">
          </article>
      `
      $(elementSelector).append(html)
  }



}