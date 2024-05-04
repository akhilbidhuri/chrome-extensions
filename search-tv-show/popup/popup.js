chrome.storage.local.get(["shows"], (res) => {
    renderShows(res.shows)
})

function renderShows(shows) {
    const showsContainer = document.getElementById("shows-container")
    console.log("Shows: ", shows)
    shows.forEach(show=>{
        const showElement = document.createElement("div")
        const titleEelement = document.createElement("h1")
        titleEelement.textContent = show.show.name
        const ratingEelement = document.createElement("h3")
        ratingEelement.textContent = show.show.rating.average
        const showPoster = document.createElement("img")
        showPoster.src = show.show.image ? show.show.image.medium : null
        showElement.appendChild(titleEelement)
        showElement.appendChild(ratingEelement)
        showElement.appendChild(showPoster)
        showsContainer.appendChild(showElement)
    })
}