function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionOnMap);
    } else {
        var message = "<div class='well'>";
        message += "<h1 class='text text-muted'>This browser does not support geolocation.";
        message += "</div>";
        $('#map').html(message);
    }
}

function showPositionOnMap(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);

    var options = {
        center: latlon,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    var map = new google.maps.Map(document.getElementById("map"), options);
    var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });

    $.ajax({
        dataType: 'json',
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        data: {
            latlng: lat + "," + lon,
            key: "AIzaSyAwaNsmk2YFFuuwg-XyHwsV6-lxoa3vlKU",
        },
        success: function (data) {
            console.log(data.formatted_address);
            $('#address').attr("title", data.results[0].formatted_address);
            $('#address').tooltip('fixTitle');
        },
        error: function (xhr, err, thrown) {
            $('#address').attr("title", "Could not fetch address. Check the console for details.");
            console.log(err);
            console.log(thrown);
        }
    })

}

function main() {
    $('[data-toggle="tooltip"]').tooltip();
    
    // TODO: Uncomment when finished.
    //getGeolocation();

    // Add smooth scrolling to all links
    // Thanks to www.w3schools.com for the code.
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
}

$('document').ready(main);