function overdueWarning() {
    let publishDateStr = document.getElementById("article-info").innerText;
    let publishDate = new Date(publishDateStr);
    let warningDom = document.getElementById("overdue-warning");
    let warningDayNumDom = document.getElementById("overdue-warning-day-num");
    let warningDayNum = parseInt(warningDayNumDom.innerText);
    let currentDate = new Date();
    let diff = (currentDate - publishDate) / (1000 * 60 * 60 * 24);
    warningDayNum = Math.floor(diff);
    warningDayNumDom.innerText = warningDayNum;
    if (warningDayNum > 365) {
        warningDom.style.display = "block";
    }
}

overdueWarning();