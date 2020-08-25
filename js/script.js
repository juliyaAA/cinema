$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        nav: true,
        navText: [
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
        ],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
});

// const genre_1 = 'фентези';
// const genre_1 = 'драма';
// const genre_1 = 'комедия';
// const genre_1 = 'мультфильм';
// const genre_1 = 'боевик';
// const films = [
//     {
//         start: '10.00',
//         name: 'Человек-паук',
//         genre: [
//             0,
//             1,
//             2
//         ]
//     },
//     {
//         start: '12.00',
//         name: 'Собачья жизнь 2',
//         genre: [
//             0,
//             1,
//             2
//         ]
//     },
//     {
//         start: '14.00',
//         name: 'История игрушек 4',
//         genre: [
//             0,
//             1,
//             2
//         ]
    
// ]

// document.getElementById('film_start_1');
// film_start_1.innerHTML = film[0].start