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

function makeTocDom(titleObj) {
    let el = document.createElement("div");
    el.classList.add("toc-" + titleObj.tagName, "toc-item", "toc-item-active");
    
    let title = document.createElement("div");
    title.className = "toc-item-title";
    
    let arrowContainer = document.createElement("div");
    arrowContainer.className = "toc-item-arrow";
    let arrow = document.createElement("span");
    arrow.className = "arrow";
    arrowContainer.appendChild(arrow);
    title.appendChild(arrowContainer);

    let text = document.createElement("span");
    text.className = "toc-item-content"
    text.innerText = titleObj.text;
    text.setAttribute("data-anchor", titleObj.id);
    title.appendChild(text);

    el.appendChild(title)

    if (titleObj.children.length === 0) {
        arrowContainer.classList.add("toc-item-arrow-none");
    } else {
        let childrenContainer = document.createElement("div");
        childrenContainer.className = "toc-item-children";
        titleObj.children.forEach(c => {
            childrenContainer.appendChild(makeTocDom(c));
        })
        el.appendChild(childrenContainer);
    }

    return el;
}

function generateToc() {
    const titleList = [];
    const headers = { "h1": 1, "h2": 2, "h3": 3, "h4": 4, "h5": 5, "h6": 6 };
    const article = document.getElementById("article-content");
    for (let i = 0; i < article.children.length; ++i) {
        child = article.children[i];
        let tagName = child.tagName.toLowerCase()
        if (Object.keys(headers).includes(tagName)) {
            let len = titleList.length;
            let titleObj = {
                tagName: tagName,
                text: child.innerText,
                id: child.id,
                children: [],
            }
            if (len === 0 || headers[tagName] <=
                    headers[titleList[len - 1].tagName]) {
                titleList.push(titleObj);
            }else {
                let f = titleList[len - 1];
                while (true) {
                    if (f.children.length == 0) {
                        break;
                    }
                    if (headers[tagName] <= 
                            headers[f.children[f.children.length - 1].tagName]) {
                        break;
                    }
                    f = f.children[f.children.length - 1];
                }
                f.children.push(titleObj);
            }
        }
    }
    console.log(JSON.stringify(titleList));
    const toc = document.getElementById("toc");
    titleList.forEach(el => {
        toc.appendChild(makeTocDom(el));
    })
    toc.onclick = function(event) {
        let target = event.target;
        if (target.className === "toc-item-content") {
            console.log(target.getAttribute("data-anchor"));
            document.getElementById(target.getAttribute("data-anchor")).scrollIntoView({
                behavior: "smooth"
            });
        } else if (target.className === "arrow" 
                || target.className === "toc-item-arrow") {
            let fa = target.parentNode.parentNode;
            if (target.className === "arrow") {
                fa = fa.parentNode;
            };
            if (fa.classList.contains("toc-item-active")) {
                fa.classList.remove("toc-item-active");
            } else {
                fa.classList.add("toc-item-active");
            }
        }
    }
    if (titleList.length != 0) {
        let nav = document.getElementById("article-nav");
        nav.style.display = "block";
    }
}

overdueWarning();
generateToc();