"use strict"
// class Calendar {
//     constructor(option) {
//         // 一些属性
//         this.currentMonth = 0; // 当月
//         this.currentYear = 1996; // 当年
//         this.currentFirstWeekDay = 1; // 当月第一天是星期几
//         this.renderCallback = null; // 用户传入的render回调函数
//         this.allDay = 31; // 本月多少天
//         this.init(new Date()); // 首次执行时，传入当前日期
//     }
//     init(date) {
//         // date 参数，一个日期对象，日历改变就是操作日期，后面操作函数也会调用该方法
//         this.currentYear = date.getFullYear();
//         this.currentMonth = date.getMonth();
//         this.currentFirstWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//         this.allDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     }

//     checknowDay(year, month, day) {
//         let date = new Date();
//         let nowYear = date.getFullYear();
//         let nowMonth = date.getMonth();
//         let nowDay = date.getDate();
//         if (nowYear === year && nowMonth === month && nowDay === day) {
//             return true;
//         } else {
//             return false;
//         }
//     }


//     getPrevMonthDay() {
//         // 该函数用来获取日历中上月需显示的天数
//         let date = new Date(this.currentYear, this.currentMonth, 0); // 获取上月；
//         let day = date.getDate(); // 因为Date函数中天设置的0，因此这里是上月最后一天的值
//         let days = this.currentFirstWeekDay;// 上月要显示几天
//         let weeks = [];
//         while (days > 0) {
//             weeks.push({
//                 year: date.getFullYear(),
//                 month: date.getMonth() + 1,
//                 day: day--,
//                 type: 'prev', // 用于标记这是上月的，可以配合渲染对处理，比如置灰啥的
//             });
//             days--;
//         }
//         return weeks.sort((a, b) => a.day - b.day); // 因为是从大到小的，排个序
//     }

//     getNowMonthDay() {
//         // 该函数用来获取日历中本月需显示的天数
//         let days = this.allDay;
//         let weeks = [];
//         let day = 1;
//         while (days > 0) {
//             let check = this.checknowDay(this.currentYear, this.currentMonth, day);
//             weeks.push({
//                 year: this.currentYear,
//                 month: this.currentMonth + 1,
//                 day: day++,
//                 type: check ? 'current' : '', // 判断当月某一天是不是现实中当天对应
//             });
//             days--;
//         }
//         return weeks;
//     }

//     getNextMonthDay() {
//         // 该函数用来获取日历中下月需显示的天数
//         let days = 42 - this.currentFirstWeekDay - this.allDay;
//         let date = new Date(this.currentYear, this.currentMonth + 1, 1); // 获取下月
//         let weeks = [];
//         let day = 1;
//         while (days > 0) {
//             weeks.push({
//                 year: date.getFullYear(),
//                 month: date.getMonth() + 1,
//                 day: day++,
//                 type: 'next',
//             });
//             days--;
//         }
//         return weeks;
//     }

//     // 操作函数
//     prevMonth() {
//         if (this.currentMonth === 0) {
//             this.currentMonth = 11;
//             this.currentYear--;
//         } else {
//             this.currentMonth--;
//         }
//         this.init(new Date(this.currentYear, this.currentMonth));
//         this.render(this.renderCallback);
//     }

//     nextMonth() {
//         if (this.currentMonth === 11) {
//             this.currentMonth = 0;
//             this.currentYear++;
//         } else {
//             this.currentMonth++;
//         }
//         this.init(new Date(this.currentYear, this.currentMonth));
//         this.render(this.renderCallback);
//     }

//     prevYear() {
//         this.currentYear--;
//         this.init(new Date(this.currentYear, this.currentMonth));
//         this.render(this.renderCallback);
//     }

//     nextYear() {
//         this.currentYear++;
//         this.init(new Date(this.currentYear, this.currentMonth));
//         this.render(this.renderCallback);
//     }

//     // 渲染函数，用户新建一个实例后必须使用此函数获取最新的日期数据，接收一个回调函数
//     render(fn) {
//         if (typeof fn !== 'function') {
//             throw new Error('参数必须是个函数');
//         }
//         let weeks = [...this.getPrevMonthDay(), ...this.getNowMonthDay(), ...this.getNextMonthDay()];
//         let data = [];
//         let count = [];
//         // 这里的操作是把1维数组转成二维数组
//         for (let i = 0; i < weeks.length; i++) {
//             if (count.length === 6) {
//                 count.push(weeks[i]);
//                 data.push(count);
//                 count = [];
//             }
//             else {
//                 count.push(weeks[i]);
//             }
//         }
//         fn(data);
//         // 一定要保存用户传入的函数，这要操作函数调用时能使用它
//         if (!this.renderCallback) {
//             this.renderCallback = fn;
//         }
//     }
// }
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
