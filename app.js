"use strict"
const month = document.querySelector("#calendar-title")
const year = document.querySelector("#calendar-year")
const next = document.querySelector("#next")
const prev = document.querySelector("#prev")
const day = document.querySelector("#days")
const iconBtn = document.querySelectorAll(".btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// 目標年,月,日
let date = new Date();
let crrYear = date.getFullYear();
let crrMonth = date.getMonth()
// 目標Week
let crrWeek = date.getDay();
// 目標Day
let crrDay = date.getDate();
// 換月
iconBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        crrMonth = !index ? crrMonth - 1 : crrMonth + 1
        // 換年
        if (crrMonth < 0 || crrMonth > 11) {
            //crrMonth超過0~11 求一個新的Date,new Date(2023, 12or-1)=(2024,0),(2022,11)
            let date = new Date(crrYear, crrMonth)
            crrMonth = date.getMonth()
            crrYear = date.getFullYear()
        }
        renderCalender();//重新計算一次
    })
})
const renderCalender = () => {
    // 目標月最後一天
    let lastDateOfMonth = new Date(crrYear, crrMonth + 1, 0).getDate()
    // 前一個月的最後一天
    let prevDateOfMonth = new Date(crrYear, crrMonth, 0).getDate()
    // 目標月的最後一天是禮拜幾
    let lastDateOfWeek = new Date(crrYear, crrMonth + 1, 0).getDay()
    // 目標月的第一天是禮拜幾
    let firstDayOfWeek = new Date(crrYear, crrMonth, 1).getDay()
    let LI = "";
    for (let i = prevDateOfMonth - firstDayOfWeek; i < (prevDateOfMonth); i++) {
        LI += `<li style="color:red">${i}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        LI += `<li>${i}</li>`;
    }
    for (let i = 1; i <= (6 - lastDateOfWeek); i++) {
        LI += `<li style="color:red">${i}</li>`;
    }


    day.innerHTML = LI;
    year.innerText = crrYear;
    month.innerText = months[crrMonth];
}
renderCalender();


// 如果這個月第一天是X在ul前面加X個空白li
