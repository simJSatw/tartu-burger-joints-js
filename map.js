
let map
const centerPoint = { lat: 58.3781492, lng: 26.7310792 }

function initMap() {

    // Drawing the map
    map = new google.maps.Map(document.getElementById('venueMap'), {
        center: centerPoint,
        zoom: 13
    })

    // Adding a Circle of 1km radius to the map 
    let busStatRad = new google.maps.Circle({
        center: centerPoint,
        radius: 1000,
        map: map,
        strokeOpacity: 1,
        strokeWeight: .1,
        fillColor: '#399E86',
        fillOpacity: 0.4
    })


    // calling the fetching function w/ markers and info-windows
    mapConfig()
}

function mapConfig() {

    // Fetching Burger Joints from FoursquareAPI
    fetch('https://api.foursquare.com/v2/venues/search?intent=browse&ll=58.3781492,26.7310792&radius=5000&categoryId=4bf58dd8d48988d16c941735&client_id=IRYVPBFRPETDRB4EBKWLNMNGBQN4QO2AEH3YQAZ22R1LQWHQ&client_secret=QETZNEZK4SGQKO3U0RE3HCZBLX4GSCO33TGCNTBUE0UIGLJ1&v=20180924')
        .then((res) => res.json())
        .then((data) => {

            // Getting array of venues
            let venuesList = data.response.venues

            // list with each venue's 'lng', 'lat', 'name', 'distance' properties
            let locationsList = []

            venuesList.forEach((venue) => {
                let venueLoc = {
                    lng: venue.location.lng,
                    lat: venue.location.lat,
                    name: venue.name,
                    distance: venue.location.distance
                }

                // Pushing each object w/ properites above to the array
                locationsList.push(venueLoc)
            })

            // Filtering out venues with distance greater than 1km from center
            let fltrdLocList = locationsList.filter((venue) => venue.distance > 1000)



            // Creating a Google Maps marker for each venue 
            fltrdLocList.forEach((venueCoord) => {

                let venueMarker = new google.maps.Marker({
                    position: { lat: venueCoord.lat, lng: venueCoord.lng },
                    title: venueCoord.name,
                    map: map,
                    icon: './assets/burgerMapIcon.png'
                })

                // Info Window for when venue is hover on a marker
                let markerInfo = new google.maps.InfoWindow({
                    content: `<span>${venueMarker.title}</span>`
                })

                venueMarker.addListener('mouseover', () => {
                    markerInfo.open(map, venueMarker)
                })
                venueMarker.addListener('mouseout', () => {
                    markerInfo.close(map, venueMarker)
                })

                // Adding each marker to the existing map
                venueMarker.setMap(map)
            })
        })

}

