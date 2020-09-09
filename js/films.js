const url = 'https://kinopoiskapiunofficial.tech/api/v2.1';
const filmsElement = document.getElementsByClassName('block5__table')[0];
const tableFilmsElement = document.getElementsByClassName('movie-list__table')[0];

const films = [
  568413,
  530,
  1045172,
  1005878,
  535341,
  1236063
];


const getFilmById = function (id) {
  return new Promise(function(resolve, reject){
        fetch(`${url}/films/${id}`, {
          headers: {
            "X-API-KEY": "5f2df07b-6b31-442c-a7f0-547a878cae6b"
          }
        }).then(response => response.json()).then(resolve);
  });
};

const parseFilm = function (data) {
  data = data.data;
  let countries = '';
  let genres = '';
  console.log(data)
  data.genres.forEach(function(item){
     genres += `${item.genre} `;
  });
  data.countries.forEach(function(item){
     countries += `${item.country} `;
  });
  return {
    name: data.nameRu,
    country: countries,
    genre: genres,
    year: data.year,
    description: data.description,
    img: data.posterUrl,
    link: data.webUrl
  };
};
 const film = {
  getName: function() {
    return this.nameRu;
  },
  getCountry: function() {
    let countries;
    this.countries.forEach(function(item){
      genres += `${item.country}`
   });
   return countries;
  },
  getYear: function() {
     return this.year;
  },
  getDescription: function() {
     return this.description;
  },
  getImg: function() {
     return this.posterUrl;
  },
  getLink: function() {
    return this.webUrl;
  },
  getStart: function() {
    function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let time1, time2, time3, time4;
      time1 = getRandomNumber(0, 2);
      time3 = getRandomNumber(0, 5);
      time4 = getRandomNumber(0, 9);
      switch (time1) {
        case 0:
        case 1:
          time2 = getRandomNumber(0, 9);
        default:
          time2 = getRandomNumber(0, 3);
      }
    return `${time1}${time1}:${time3}${time4}`;
  },
  getGenre: function() {
    let genres = '';
    this.genres.forEach(function(item){
       genres += `${item.genre} `;
    })
    return genres;
  },
  renderFilmRow: function() {
  return  `<tr class="movie-list__table_one dark">
            <td id="film_start_1" class="movie-list__table_one-time">${this.getStart()}</td>
            <td id="film_name_1" class="movie-list__table_one-text">${this.name}</td>
            <td class="movie-list__table_one-plus">${this.getGenre()}</td>
          </tr>`;
  }
  // renderFilmBlock: function() {
  //   return `<div class="block5__table-film">
  //             <div class="block5__film">
  //               <div class="block5__poster"><img src="${this.getImg()}"></div>
  //               <div class="block5__cosial">
  //                 <h3 class="block5__cosial-name">${this.name}</h3>
  //                 <div class="block5__cosial-band"></div>
  //                   <p class="block5__cosial-definition">${this.description}</p>
  //                 <div class="block5__cosial-pin">
  //                   <a class="block5__cosial-pin_icons" href="https://www.facebook.com" target="_blank"><img class="block5__cosial-pin_img"
  //                       src="img/facebook.svg" alt="Facebook"></a>
  //                   <a class="block5__cosial-pin_icons" href="https://twitter.com" target="_blank"><img class="block5__cosial-pin_img"
  //                       src="img/twitter.svg" alt="Twitter"></a>
  //                   <a class="block5__cosial-pin_icons" href="https://www.behance.net" target="_blank"><img class="block5__cosial-pin_img"
  //                       src="img/behance-logo.svg" alt=""></a>
  //                   <a class="block5__cosial-pin_icons" href="https://dribbble.com" target="_blank"><img class="block5__cosial-pin_img"
  //                       src="img/dribbble.svg" alt=""></a>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>`;
  // }
};

// const generateTableItem = function(name, genre){
  
// };

// const time = `${time1}${time1}:${time3}${time4}`;{
//   return `<tr class="movie-list__table_one dark">
//             <td id="film_start_1" class="movie-list__table_one-time">${time}</td>
//             <td id="film_name_1" class="movie-list__table_one-text">${name}</td>
//             <td class="movie-list__table_one-plus">${genre}</td>
//           </tr>`;
// };


const generateFilmItem = function ({name, country, genre, year, description, img, link}){
  return `<div class="block5__table-film">
            <div class="block5__film">
              <div class="block5__poster"><img src="${img}"></div>
              <div class="block5__cosial">
                <h3 class="block5__cosial-name">${name}</h3>
                <div class="block5__cosial-band"></div>
                  <p class="block5__cosial-definition">${description}</p>
                <div class="block5__cosial-pin">
                  <a class="block5__cosial-pin_icons" href="https://www.facebook.com" target="_blank"><img class="block5__cosial-pin_img"
                      src="img/facebook.svg" alt="Facebook"></a>
                  <a class="block5__cosial-pin_icons" href="https://twitter.com" target="_blank"><img class="block5__cosial-pin_img"
                      src="img/twitter.svg" alt="Twitter"></a>
                  <a class="block5__cosial-pin_icons" href="https://www.behance.net" target="_blank"><img class="block5__cosial-pin_img"
                      src="img/behance-logo.svg" alt=""></a>
                  <a class="block5__cosial-pin_icons" href="https://dribbble.com" target="_blank"><img class="block5__cosial-pin_img"
                      src="img/dribbble.svg" alt=""></a>
                </div>
              </div>
            </div>
          </div>`;

};

let element, prepareFilm;
films.forEach(function(item){
  let film = getFilmById(item);
  film.then(result => {
        prepareFilm = parseFilm(result);
        element = generateFilmItem({...prepareFilm});
        filmsElement.insertAdjacentHTML('beforeEnd', element);
        tableElement = generateTableItem({...prepareFilm});
        tableFilmsElement.insertAdjacentHTML('beforeEnd', tableElement);
  });
});
