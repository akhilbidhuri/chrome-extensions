let tasks = []

const addTaskBtn = document.getElementById("add-task-btn")
const startTimerBtn = document.getElementById("start-timer-btn")
const resetTimerBtn = document.getElementById("reset-timer-btn")
const timeEelement = document.getElementById("time")
const taskContainerElement = document.getElementById("task-container")

chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ?? []
    renderTasks()
})

function saveTasks() {
    chrome.storage.sync.set({
        tasks,
    })
}

function renderTask (taskIndex) {
    const taskRow = document.createElement("div")
    taskRow.className = "task-row"

    const text = document.createElement("input")
    text.type = "text"
    text.placeholder = "Enter a task ..."
    text.className = "task-name"
    text.value = tasks[taskIndex]
    text.addEventListener("change", () => {
        tasks[taskIndex] = text.value
        saveTasks()
    })

    const deleteBtn = document.createElement("input")
    deleteBtn.type = "button"
    deleteBtn.value = "X"
    deleteBtn.className = "delete-btn"
    deleteBtn.addEventListener("click", () => deleteTask(taskIndex))

    taskRow.appendChild(text)
    taskRow.appendChild(deleteBtn)

    taskContainerElement.appendChild(taskRow)
}

function renderTasks() {
    tasks.forEach((_, taskIndex)=>{
        renderTask(taskIndex)
    })
}

function deleteTask (taskIndex) {
    taskContainerElement.textContent = ""
    tasks.splice(taskIndex, 1)
    saveTasks()
    renderTasks()
}

function addTask() {
    const taskIndex = tasks.length
    tasks.push("")
    renderTask(taskIndex)
    saveTasks()
}

addTaskBtn.addEventListener("click", addTask)

startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            isRunning: !res.isRunning
        }, () => {
            startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
        })
    })
})

resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false
    }, () => {
        startTimerBtn.textContent = "Start Timer"
    })
})

function updateTime() {
    chrome.storage.local.get(["timer", "timeOption"], (res) => {
        const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
        let seconds = "00"
        if (res.timer % 60 !== 0)
            seconds = `${60 - res.timer%60}`.padStart(2, "0")
        timeEelement.textContent = `${minutes}:${seconds}`
    })
}

updateTime()
setInterval(updateTime, 1000)
