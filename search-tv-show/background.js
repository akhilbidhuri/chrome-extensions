chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({
        shows: []
    })
    chrome.contextMenus.create({
        title: "Search TV Show",
        id: "contextMenu1",
        contexts: ["page", "selection"]
    })
    chrome.contextMenus.create({
        title: "Read this Text",
        id: "contextMenu2",
        contexts: ["page", "selection"]
    })
})

chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "contextMenu1") {
        fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then(res=> res.json())
        .then(data => {
            chrome.storage.local.set({
                shows: data
            })
        })
    } else {
        chrome.tts.speak(event.selectionText)
    }
})