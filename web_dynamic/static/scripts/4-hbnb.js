$(document).ready(init);

function init() {
    const amenityObj = {};
    $('.amenities .popover input').change(function () {
        if ($(this).is(':checked')) {
            amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
        } else if ($(this).is(':not(:checked)')) {
            delete amenityObj[$(this).attr('data-name')];
        }
        const names = Object.keys(amenityObj);
        $('.amenities h4').text(names.sort().join(', '));
    });
	// making request to check api status
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	});
	// request dynamic place search via api
	$.get('http://0.0.0.0:5001/api/v1/places_search/', function(data) {
		if (textStatus === 'success') {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		}
	});
	$.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		data: '{}',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			for (let i = 0; i < data.length; i++) {
				let place = data[i];
				$('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
			}
		}
	});
	$('.filters > button').click(function () {
		$('.places > article').remove();
		$.ajax({
			type: 'POST',
			url: 'http://0.0.0.0:5001/api/v1/places_search',
			data: JSON.stringify({'amenities': Object.keys(checkedAmenities)}),
			dataType: 'json',
			contentType: 'application/json',
			success: function (data) {
				for (let i = 0; i < data.length; i++) {
					let place = data[i];
					$('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
				}
			}
		});
	});
});
