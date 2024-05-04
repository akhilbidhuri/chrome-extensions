const timeOption = document.getElementById("time-option")
const saveOptionsBtn = document.getElementById("save-options-btn")

chrome.storage.local.get(["timeOption"], (res) => {
    const timeVal = res.timeOption ?? 25
    timeOption.value = timeVal
})

timeOption.addEventListener("change", (event) => {
    const val = event.target.value
    if(val < 1 || val >60) {
        timeOption.value = 25
    }
})

saveOptionsBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
        timeOption: timeOption.value,
    })
})