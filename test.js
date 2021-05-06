/*

https://jsonplaceholder.typicode.com/albums/
https://jsonplaceholder.typicode.com/albums/1/photos

*/

renderPhotos()

async function getPhotos(albumID){
  let result = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`)
  let response = await result.json()
  return response
}

 async function renderPhotos(event){
/*     let element = event.target
    element.value
    $(this) === $(event.target) */

  let albumID = $(this).val() 

  let photos = await getPhotos(albumID)
  $('main').html('')
  photos.forEach(photo => {
    let html =`
    <article>
      <h2>${photo.title}</h2>
      <img src="${photo.thumbnailUrl}">
    </article>
    `

    $('main').append(html)
  })

} 

async function  getAlbums() {
  let result = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  let response = await result.json()
  return response
}

async function renderAlbums() {
  let albums = await getAlbums()
  let html = albums.map(album =>{
    return `
      <option value="${album.id}">${album.title}</option>
    `
  })
  $('header').prepend(`<select> <option>Välj album:</option <${html.join('')}</select>`)

}

renderAlbums()

// delegerat event:
$('header').on('change', 'select', renderPhotos)

// undelegated (normal) event:
$('header>input').on('keyup', searchPhotos)

function  searchPhotos() {
let searchText = $(this).val()
$('main>article').each(function() {
  //article children
  let articleText = $(this).children('h2').text()
  if (articleText.includes(searchText)){
    $(this).show()
  }else{
    $(this).hide()
  }
  
})
  
}