
function getVenues() {

    fetch('https://api.foursquare.com/v2/venues/search?intent=browse&ll=58.3781492,26.7310792&radius=5000&categoryId=4bf58dd8d48988d16c941735&client_id=IRYVPBFRPETDRB4EBKWLNMNGBQN4QO2AEH3YQAZ22R1LQWHQ&client_secret=QETZNEZK4SGQKO3U0RE3HCZBLX4GSCO33TGCNTBUE0UIGLJ1&v=20180924')
        .then((res) => res.json())
        .then((data) => {

            let venuesList = data.response.venues
            let venuesIdList = []

            // Getting all venues IDs and pushing them to the array
            venuesList.forEach((venue) => {
                let venueId = venue.id
                venuesIdList.push(venueId)
            })

            // Invoking the function and feeding IDs array as a parameter
            getPhotos(venuesIdList)

        })
}

function getPhotos(idsList) {

    // List of All Venue Objects
    const imgUrlsList = []

    idsList.forEach((id) => {

        fetch(`https://api.foursquare.com/v2/venues/${id}?client_id=IRYVPBFRPETDRB4EBKWLNMNGBQN4QO2AEH3YQAZ22R1LQWHQ&client_secret=QETZNEZK4SGQKO3U0RE3HCZBLX4GSCO33TGCNTBUE0UIGLJ1&v=20180924`)
            .then((res) => res.json())
            .then((data) => {

                const venue = data.response.venue

                if (venue.photos.groups[1]) {
                    let photoLoc = venue.photos.groups[1].items

                    // Composing full img URL
                    photoLoc.forEach((photo) => {
                        let photoUri = `${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`
                        // Pushing each url to the array of Uris
                        imgUrlsList.push(photoUri)
                    })
                }

                // Appending images to the gallery div 
                let output = ''
                imgUrlsList.forEach((photoUri) => {
                    output += `
                        <img src="${photoUri}">
                    `
                })

                document.getElementById('imgGallery').innerHTML = output

            })

    })


}

// Invoking the function
getVenues()
