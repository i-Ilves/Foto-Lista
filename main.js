/*

https://jsonplaceholder.typicode.com/albums/
https://jsonplaceholder.typicode.com/albums/1/photos

*/
async function getPhotos(albumId){
  let result = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  let response = await result.json()
  return response
}



async function start(){
  let albumList = new AlbumList()
  await albumList.getAlbums()
  albumList.render()
}

start()


// "undelegated" event (normal)
$('header>input').on('keyup', searchPhotos)

function searchPhotos(){
  let searchText = $(this).val()
  $('main>article').each(function(){
      // article children
      let articleText = $(this).children('h2').text()
      if(articleText.includes(searchText)){
          $(this).show()
      }else{
          $(this).hide()
      }
  })

}