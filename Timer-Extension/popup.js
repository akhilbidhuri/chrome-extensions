const timeElement = document.getElementById("time")
const nameElement = document.getElementById("name")
const timerElement = document.getElementById("timer")
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

function updateTimeElements () {
    chrome.storage.local.get(["timer"], (res) => {
        const time = res.timer ?? 0
        timerElement.textContent = `Timer is at: ${time} seconds`
    })

    timeElement.textContent = `Current time is ${new Date().toLocaleTimeString()}`
}

updateTimeElements()
setInterval(updateTimeElements, 1000)

chrome.storage.sync.get(["name"], (res)=> {
    const name = res.name ?? "???"
    nameElement.textContent = `Your name is: ${name}`
})

startBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: true,
    })
})

stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false,
    })
})

resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    })
})
