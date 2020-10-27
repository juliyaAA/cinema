$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        nav: true,
        navText: [
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
        ],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3
            }
        }
    });
});

$(function(){
    //2. Получить элемент, к которому необходимо добавить маску
    $("#phone").mask("+7 (999) 999-99-99");
});

const closePopurButton = document.getElementById('popup-close');
const openPopurButton = document.getElementById('popup-open');
const sendForm = document.getElementById('submit');

const popup = document.getElementById('popup');
closePopurButton.onclick = function (event) {
    event.preventDefault();
    popup.classList.add('hidden');
};

openPopurButton.onclick = function (event) {
    event.preventDefault();
    popup.classList.remove('hidden');
};

sendForm.onclick = function (event) {
    event.preventDefault();
    let name = document.getElementById('name-text');
    let nameParent = name.parentNode;
    nameParent.classList.remove('error');
    nameParent.getElementsByClassName('popup-error-message')[0].innerHTML = '';
    if (!checkInput(name.value)) {
        nameParent.classList.add('error');
        nameParent.getElementsByClassName('popup-error-message')[0].innerHTML = 'Заполните поле Имя';
    }

    let agree = document.getElementById('agree');
    let agreeParent = agree.parentNode;
    agreeParent.classList.remove('error');
    agreeParent.getElementsByClassName('popup-error-message')[0].innerHTML = '';
    if (!agree.checked) {
        agreeParent.classList.add('error');
        agreeParent.getElementsByClassName('popup-error-message')[0].innerHTML = 'Согласитесь на передачу данных';
    }

    let select = document.getElementById('select');
    let selectParent = select.parentNode;
    selectParent.classList.remove('error');
    selectParent.getElementsByClassName('popup-error-message')[0].innerHTML = '';
    if (select.value == 0) {
        selectParent.classList.add('error');
        selectParent.getElementsByClassName('popup-error-message')[0].innerHTML = 'Выберите место';
    }
};

function checkInput(value) {
    return (value) ? true : false;
}