class AlbumList{

  albums = []
  
  constructor(){
      this.registerEventListeners()
  }

  async getAlbums(){
      let result = await fetch('https://jsonplaceholder.typicode.com/albums/')
      let response = await result.json()
      for(let album of response){
          this.albums.push( new Album(album) )
      }
  }

  registerEventListeners(){
      // delegerat event: 
      $('header').on('change', 'select', (e)=>{
          this.renderCurrentAlbum(e)
      })
  }

  renderCurrentAlbum(e){
      let albumId = $(e.target).val()
      console.log(this.albums)
      for(let album of this.albums){
          if(album.id == albumId){
              album.render()
              break
          }
      }
  }

  async render(){
      let html = this.albums.map(album => {
          // album.title
          // album.id
          return `
              <option value="${album.id}">${album.title}</option>
          `
      })
  
      $('header').prepend(`<select> <option>Välj album:</option> ${html.join('')} </select>`)
  
  }

}