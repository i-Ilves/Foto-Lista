/*
https://jsonplaceholder.typicode.com/albums/
https://jsonplaceholder.typicode.com/albums/1/photos
*/

fetchAlbums();

async function fetchAlbums(){
  // 1. läsa in våra album
  let albums = [];
  // vi behöver async / await för att vi är beroende av datan från callbacken ->
  await $.getJSON('https://jsonplaceholder.typicode.com/albums/', (data)=>{
    albums = data;
  })
  // -> här, på nästa rad:
  renderAlbums(albums);
 }

function renderAlbums(albums){
  // 2. rendera dem till en select-lista i html
  let html = $('<select id="select-album"></select>');
  html.append('<option>Välj album:</option>');

  // 3. iterera över albumen
  albums.forEach( (album) => {
    html.append(`
      <option value="${album.id}">
        ${album.title}
      </option>
    `)
  })

  // 4. lägg till resultatet i HTML (i main-elementet)
  $('header').prepend(html)

}

// lyssna på val av album
$('body').on('change', '#select-album', loadPhotos);

// global variabel med bilder
let photos = []

// och ladda bilder
async function loadPhotos(){
  let albumId = $(this).val();
  console.log('albumId', albumId);
  await $.getJSON(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`, data => photos = data);
  renderPhotos(photos)
}

// rendera bilder till html
function renderPhotos(photos){
  // töm #photos
  $('#photos').html('');
  // iterera ut bilderna
  let html = photos.map( photo => `
    <article>
      <img src="${photo.thumbnailUrl}">
      <h2>${photo.title}</h2>
    </article>
  `);

  html.forEach( article => $('#photos').append(article) );

}

// lyssna på att vi skriver i sökfältet
$('header>input').on('keyup', filterPhotos);

// filtera den aktuella arrayen med bilder (hur får vi tag på den?)
function filterPhotos(){
  let searchText = $(this).val();
  console.log(searchText);
  // matcha söktexten i originallistan "photos"
  let filteredPhotos = photos.filter( photo => photo.title.includes(searchText) )
  // rendera om #photos
  renderPhotos(filteredPhotos)
}

