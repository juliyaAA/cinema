$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        nav: true,
        navText: [
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>',
            '<svg width="35" height="35" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
        ],
        responsive:{
            0:{
                items:1,
                center: true
            },
            600:{
                items:2,
                center: true
            },
            1000:{
                items:3
            }
        }
    });
});