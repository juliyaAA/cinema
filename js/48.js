const mock = [
    {
        name: "Человек-паук",
        start: "10:00",
        genre: [0, 1, 2],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov1.jpg", 
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 200,
        room: 0,
        tickets: []
    },
    {
        name: "Собачья жизнь 2",
        start: "12:00",
        genre: [3, 4, 5],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov2.jpg", 
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 300,
        room: 1,
        tickets: []
    },
    {
        name: "История игрушек 4",
        start: "14:00",
        genre: [6, 3, 5],
        filmHire: true,
        filmNew: false,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov4.jpg", 
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 500,
        room: 2,
        tickets: []
    },
    {
        name: "Люди в чёрном: Интернэшнл",
        start: "16:00",
        genre: [0, 1, 5],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/mov3.jpg", 
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        price: 700,
        room: 1,
        tickets: []
    }
];

//справочник жанров (шаг5) - так часто работают сервисы
const genres = [
    {
        id: 0,
        name: "фантастика"
    },
    {
        id: 1,
        name: "боевик"
    },
    {
        id: 2,
        name: "приключения"
    },
    {
        id: 3,
        name: "фэнтези"
    },
    {
        id: 4,
        name: "драма"
    },
    {
        id: 5,
        name: "комедия"
    },
    {
        id: 6,
        name: "мультфильм"
    }
];

const rooms = [
    {
        id: 0,
        name: 'X',
        count: 10
    },
    {
        id: 1,
        name: 'L',
        count: 15
    },
    {
        id: 2,
        name: 'XL',
        count: 20
    }
];

//массивы для хранения отсортированных данных
let filmsNew = [],
    filmsHire = [];
//сортируем на новинки и в прокате
for (let i = 0; i < mock.length; i++) {
    let currentFilm = mock[i];

    if (currentFilm.filmHire) {
        filmsHire.push(currentFilm);
    }

    if (currentFilm.filmNew) {
        filmsNew.push(currentFilm);
    }
}

//объект-обертка для универсализации работы с данными
const film = {
    getName: function() {
        return this.name;
    },

    getStart: function() {
        return this.start;
    },

    // метод получения жанра шаг 6
    getGanre: function() {
        //хранит текущие идентификаторы жанров. Здесь тоже используется this!
        const ganarsIds = this.genre;

        //вспомогательный массив, который будет хранить текстовые описания жанров
        let arrGanars = [];

        //проходим по id шникам жанров
        for (let i = 0; i < ganarsIds.length; i++) {
            let currentId = ganarsIds[i];

            //так делали на лекции
            //arrGanars.push( genres[currentId] );

            //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            let genreText = genres.find(
                //el содержит текущий элемент перебираемого массива genres
                function(el) {
                    //если условие выполняется, то возвращается проверяемый элемент
                    return el.id == currentId;
                }
            ).name; //элементом genres является объект справочника { id:..., name... }, на этом объекте
            // берем поле name и сохраняем как genreText;

            arrGanars.push(genreText); //добаляем полученный genreText во вспомогательный массив
        }

        //текстовое представление жанров
        //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        let strGanars = arrGanars.join(", ");
        return strGanars;
    },

    getRoom: function() {
        const room = this.room;
        const name = rooms.find(
            function(el) {
                return el.id == room;
            }
        ).name;
        const count = rooms.find(
            function(el) {
                return el.id == room;
            }
        ).count;
        return {
            name,
            count
        };
    },

    getPrice: function () {
        return this.price;
    },

    //шаг 7. Метод рендеринга одной строки таблицы
    renderFilmRow() {
        //console.warn(this); //this содержит проброшенный объект
        let filmName = this.name,
            filmStart = this.start,
            filmGanars = film.getGanre.apply(this),
            filmPrice = this.price,
            filmHTML = `<td class="movie-list__table_one-time">${filmStart}</td>
                        <td class="movie-list__table_one-text">${filmName}</td>
                        <td class="movie-list__table_one-plus">${filmGanars}</td>
                        <td>${filmPrice}</td>`;
        return filmHTML;
    },

    //CA - вывод фильмов в мозайку
    renderFilmBlock() {
        let filmName = this.name,
            filmImage = this.image,
            filmDescription = this.description,
            filmFb = this.fb,
            filmTw = this.twitter,
            filmBh = this.behance,
            filmHTML =  `<div class="block5__table-film">
                            <div class="block5__film">
                            <div class="block5__poster"><img src="${filmImage}"></div>
                            <div class="block5__cosial">
                                <h3 class="block5__cosial-name">${filmName}</h3>
                                <div class="block5__cosial-band"></div>
                                <p class="block5__cosial-definition">${filmDescription}</p>
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
        return filmHTML;
    },

    renderFilmPlaces(count) {
        let cinemaTickets = document.getElementById('cinema-tickets');
        let countTicket = document.getElementById('orderFilmCountTicket');
        let orderFilmTotalPrice = document.getElementById('orderFilmTotalPrice');
        cinemaTickets.innerHTML = '';

        for(let i = 1; i < count + 1; i++) {
            let element = document.createElement('div');
            console.log(element);
            element.classList.add('square');
            // Правая кнопка мыши
            element.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    console.log(filmsHire, i);
                    alert(filmsHire[indexFilm].price);
            });
            element.addEventListener("mouseover", function (event) {
                event.target.classList.add('clic'); 
            });
            element.addEventListener("mouseout", function (event) {
                event.target.classList.remove('clic'); 
            }); 
            // Проверка на уже забронированный билет
            this.tickets.forEach(item => {
                if(item === i) {
                    element.classList.add('bought');
                }
            });
            element.innerHTML = i;
            element.setAttribute('data-plase', i);
            cinemaTickets.append(element),
            element.onclick = event => {
                if(event.target.classList.contains('bought')) {
                    // alert('место забронировано');
                    event.target.classList.remove('bought');
                    countTicket.innerHTML = parseInt(countTicket.innerHTML) - 1;
                    orderFilmTotalPrice.innerHTML = this.price * parseInt(countTicket.innerHTML);
                } else if (!event.target.classList.contains('reserve')) {
                    event.target.classList.add('clic', 'bought');
                    countTicket.innerHTML = parseInt(countTicket.innerHTML) + 1;
                    orderFilmTotalPrice.innerHTML = this.price * parseInt(countTicket.innerHTML);
                }//  else {
                //     event.target.classList.remove('reserve');
                //     countTicket.innerHTML = parseInt(countTicket.innerHTML) - 1;
                //     orderFilmTotalPrice.innerHTML = this.price * parseInt(countTicket.innerHTML);
                // }
            };
        }
    }
};
 

//тестирование объекта-обертки (шаг 4), расомментируйте для проверки
//для проброса контекста используем apply
/****/
console.log('В прокате:');
for( let i=0; i<filmsHire.length; i++ ) {
    let currentFilm = filmsHire[i];

    console.log( film.getName.apply(currentFilm) );
    console.log( film.getGanre.apply(currentFilm) );
}

console.log('Новинки:');
for( let i=0; i<filmsNew.length; i++ ) {
    let currentFilm = filmsNew[i];

    console.log( film.getName.apply(currentFilm) );
    console.log( film.getGanre.apply(currentFilm) );
}


//протестируем метод рендеринга одной строки (шаг 7), раскомментируйте для проверки
//для проброса контекста используем bind, в отличие от apply метод не выполняется сразу
//требуется добавить скобки вызова функции на конце

console.log("Отрендеренные строки с фильмом:");
for (let i = 0; i < filmsHire.length; i++) {
    let currentFilm = filmsHire[i];
    console.log( film.renderFilmRow.bind(currentFilm)() );
}


//добавить фильмы в таблицу (шаг 9)
//в теге table таблицы с фильмами не забудьте прописать id="filmsHire" и удалить все строки, кроме заголовка
//получаем DOM элемент с таблицей

// Билеты на фильмы
let ticked = [];
let indexFilm = null;

let tableDOM = document.getElementById("filmsHire");
for (let i = 0; i < filmsHire.length; i++) {
    let currentFilm = filmsHire[i],
        filmName = film.getName.bind(currentFilm)(),
        filmRoom = film.getRoom.bind(currentFilm)(),
        filmStart = film.getStart.bind(currentFilm)(),
        filmGanars = film.getGanre.bind(currentFilm)(),
        filmPrice = film.getPrice.bind(currentFilm)(),
        filmRowHTML = film.renderFilmRow.bind(currentFilm)(),
        tr = document.createElement("tr"); //содаем DOM элемент TR;
        tr.classList.add('movie-list__table_one');
    if (i % 2 == 0)
        tr.classList.add('dark');
    else
        tr.classList.add('light');
    tr.innerHTML = filmRowHTML; //записываем в DOM элемент HTML разметку
    
    //вешаем обработчик события на строку, вызывающий модальное окно
    /*** РАЗОБРАТЬ */
    tr.onclick = function () {
        indexFilm = i;
        // 1. Находим элемент с формой заказ 
        // 2. Изменить состояние из display: none -> display: block;
        // 3. Отобразить данные по бронированию фильма

        orderForm.style.display = 'block';
        film.renderFilmPlaces.bind(currentFilm)(filmRoom.count);
        
        let orderFilmName = document.getElementById('orderFilmName');
        let orderFilmStart = document.getElementById('orderFilmStart');
        let orderFilmGanar = document.getElementById('orderFilmGanar');
        let orderFilmPrice = document.getElementById('orderFilmPrice');
        let orderFilmRoom = document.getElementById('orderFilmRoom');
        let orderFilmCountTicket = document.getElementById('orderFilmCountTicket');
        let orderFilmTotalPrice = document.getElementById('orderFilmTotalPrice');
           
        orderFilmCountTicket.innerHTML = 0;

        orderFilmName.innerHTML = filmName;
        orderFilmStart.innerHTML = filmStart;
        orderFilmGanar.innerHTML = filmGanars;
        orderFilmPrice.innerHTML = filmPrice;
        orderFilmRoom.innerHTML = filmRoom.name;
        
        orderFilmTotalPrice.innerHTML = filmPrice * parseInt(orderFilmCountTicket.innerHTML);
    };
    tableDOM.appendChild(tr); //добавляем в DOM элемент таблицы DOM элемент строки с фильмом
}

// Закрытие модального окна
/*** РАЗОБРАТЬ Event Handler */
let orderForm = document.getElementById('booking-form');
let closeOrderForm = document.getElementById('booking-close');

closeOrderForm.onclick = function () {
  orderForm.style.display = 'none';
  
};
// Закрытие по кнопке Esc
window.addEventListener("keydown", function (event) {
    if ( event.keyCode == 27 ) {
        orderForm.style.display = 'none';
    } 
});

let mosaicDOM = document.getElementById("filmsNew"); // это flex контейнер, куда добавляются блоки
for (let i = 0; i < filmsNew.length; i++) {
    let currentFilm = filmsNew[i],
        filmBlockHTML = film.renderFilmBlock.bind(currentFilm)(),
        div = document.createElement("div"); //содаем DOM элемент DIV - контейнер одного фильма в мозайке
    div.classList.add();
    div.innerHTML = filmBlockHTML; //записываем в DOM элемент HTML разметку
    mosaicDOM.appendChild(div); //добавляем в DOM элемент таблицы DOM элемент строки с фильмом
}

// Обработка формы
function checkCorrectPhoneNumber (number) {
    return true
}
const clearError = (element) => {
    let i = 0;
    while( i < element.getElementsByClassName('popup-error-message').length) {
        element.getElementsByClassName('popup-error-message')[i].parentNode.classList.remove('error');
        element.getElementsByClassName('popup-error-message')[i].innerHTML = '';
        i++;
    }
}
orderFormPlase.addEventListener('submit', event => {
    const setError = ($el, error) => {
        $el.parentNode.classList.add('error');
        $el.parentNode.getElementsByClassName('popup-error-message')[0].innerHTML = error;
    }
    event.preventDefault();
    clearError(orderFormPlase);
    const fields = orderFormPlase.getElementsByTagName('input');
    let error = false;
    const data = {
        name: '',
        phone: '',
        places: []
    };
    for (let i = 0; i < fields.length; i++) {
        switch(fields[i].getAttribute('name')){
            case 'name':
                if(!checkInput(fields[i].value)){
                    setError(fields[i], 'Заполните поле имя');
                    error = true;
                    break;
                } 
                data.name = fields[i].value; 
                break;            
            case 'phone':
                if(!checkInput(fields[i].value)){
                    setError(fields[i], 'Заполните поле телефон');
                    error = true;
                    break;
                } else {
                    if(!checkCorrectPhoneNumber(fields[i].value)){
                        setError(fields[i], 'Введите корректный номер телефона');
                        error = true;
                        break;
                    }
                    data.phone = fields[i].value;    
                }
                break;
            default:
                console.error('Поле не опознано');
        }
    }
    // Проверяем выбранные места
    // На ошибку
    if (orderFormPlase.getElementsByClassName('reserve').length < 1) {
        error = true;
        orderFormPlase.getElementsByClassName('tickets-error')[0].classList.add('error');
        orderFormPlase.getElementsByClassName('tickets-error')[0].getElementsByTagName('p')[0].innerHTML = 'Выберете место';
    } else {
        // На то что места заняты
        let places = [];
        for (let i = 0; i < orderFormPlase.getElementsByClassName('reserve').length; i++) {
            places.push(orderFormPlase.getElementsByClassName('reserve')[i].getAttribute('data-place'));
        }
        data.places = places;
    }
    // Прекратить отправку формы если есть ошибка
    if(error) {
        return
    }

    // Сформируем объект для отправки на сервер и отправим
    sendFormButton.getAttribute('disabled', 'true');
    sendFormButton.getElementsByClassName('overlay-loader')[0].style.display = 'inline-block';

    setTimeout(() => {
        sendFormButton.getAttribute('disabled');
        sendFormButton.getElementsByClassName('overlay-loader')[0].style.display = 'none';
        orderForm.style.display = 'none';
        popupSuccess.classList.remove('hidden');
    }, 3000);
})
