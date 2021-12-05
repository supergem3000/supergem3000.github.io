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

const titleList = [];
const headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
function generateToc() {
    const article = document.getElementById("article-content");
    for (let i = 0; i < article.children.length; ++i) {
        child = article.children[i];
        if (headers.includes(child.tagName.toLowerCase())) {
            titleList.push({
                tagName: child.tagName.toLowerCase(),
                text: child.innerText,
                id:child.id
            });
        }
    }
    const toc = document.getElementById("toc");
    for (let i = 0; i < titleList.length; ++i) {
        let title = titleList[i];
        let element = document.createElement("div");
        element.classList.add("toc-" + title.tagName, "toc-item");
        let text = document.createElement("span");
        text.innerText = title.text;
        text.setAttribute("data-anchor", "#" + title.id);
        element.appendChild(text);
        toc.appendChild(element);
    }
    toc.onclick = function(event) {
        let target = event.target;
        if (target.nodeName.toLowerCase() === "span") {
            console.log(target.getAttribute("data-anchor"));
            document.querySelector(target.getAttribute("data-anchor")).scrollIntoView({
                behavior: "smooth"
            });
        }
    }
    if (titleList.length != 0) {
        let nav = document.getElementById("article-nav");
        nav.style.display = "block";
    }
}

overdueWarning();
generateToc();