class Album{

  id = 0          // Int id = 0
  title = ""      // String title = ""

  constructor(album){
      // {id, title, userId}
      for(let prop in album){     
          if(this[prop] !== undefined){
              this[prop] = album[prop]
          }
      }
  }

  async render(){ // render one album contents 
      let photos = await getPhotos(this.id)
      $('main').html('')
      photos.forEach((photo)=>{
          photo = new Photo(photo)
          photo.render('main')
      })
  }

}