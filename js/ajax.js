const GEO_API = 'http://api.sypexgeo.net/';
const CITIES_API = 'https://glavpunkt.ru/api/get_rf_cities';

let city;
let cities;

function getXmlReguest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            callback.call(xhr.responseText);
        }
        if (xhr.status != 200) {
            console.log('error');
        }
    };
    xhr.send();
}

jQuery(($) => {
    $('#city_name').on('click', function(e) {
        e.preventDefault();
        chosse_city.style.display = 'inline';
        console.log(cities);
        if (!cities) {
            getXmlReguest(CITIES_API, function () {
                cities = $.parseJSON(this);
            });
        }
    });
    $('[name = city_choose]').on('keyup', function() {
            let search = $(this).val(),
                result = '<ul>',
                counter = 0;
            for (let i = 0; i < cities.length; i++) {
                    if (cities[i].name.toLowerCase().indexOf(search.toLowerCase()) >= 0 && counter < 5) {
                        result += '<li>' + cities[i].name + '</li>';
                        counter++;
                    }
            }
            result += '</ul>';
            if(!counter) {
                result = 'Ничего не найдено';
            }
            $('#search_result').html(result);
            $('body').on('click', '#search_result li', function (){
                $('#city_name').html($(this).html());
                chosse_city.style.display = 'none';
            });
        });
        $.ajax({
             url: GEO_API,
             type: 'GET',
             success: function(result){
                setTimeout(() => {
                    $('.ajax-loader').hide();
            }, 3000);
            console.log(result);
            city = result.city.name_ru;
            console.log(city);
            $('#city_name').html(city);
            $('.ajax-loader').hide();
        },
        error: function(result) {
            $('.ajax-loader').hide();
        }
    });
    $('.popup-close_img').on('click', function(e) {
        e.preventDefault();
        $(".booking").hide();
    });
});

