const zhHans = {
    "lang-display": "简体中文",
    "g-space": "GG空间",
    "articles": "文章",
    "thinkings": "随想",
    "article-list": "文章列表",
    "thinking-list": "随想",
    "catalog": "目录",
    "overdue-warning-p1": "本篇文章发布于",
    "overdue-warning-p2": "天前，其内容可能已经过期。请自行判别。",
};
const zhHant = {
    "lang-display": "繁體中文",
    "g-space": "GG空間",
    "articles": "文章",
    "thinkings": "隨想",
    "article-list": "文章列表",
    "thinking-list": "隨想",
    "catalog": "目錄",
    "overdue-warning-p1": "本篇文章發佈於",
    "overdue-warning-p2": "天前，其内容可能已經過期。請自行判別。",
};
const en = {
    "lang-display": "English",
    "g-space": "G-SPACE",
    "articles": "Articles",
    "thinkings": "Thinkings",
    "article-list": "Article List",
    "thinking-list": "Thinking List",
    "catalog": "Catalog",
    "overdue-warning-p1": "This article was posted ",
    "overdue-warning-p2": " days ago and may out of date. Please judge by yourself.",
};
const ja = {
    "lang-display": "日本語",
    "g-space": "GG空間",
    "articles": "文章",
    "thinkings": "オピニオン",
    "article-list": "文章の一覧",
    "thinking-list": "オピニオンの一覧",
    "catalog": "目録",
    "overdue-warning-p1": "この記事は",
    "overdue-warning-p2": "日前に発表され、内容が期限切れになった可能性があります。自分で判別してください。",
};

const langs = {
    "zh-Hans": zhHans,
    "zh-Hant": zhHant,
    "en": en,
    "ja": ja,
}

const langAliasMap = {
    "zh-CN": "zh-Hans",
    "zh-HK": "zh-Hant",
    "zh-TW": "zh-Hant",
    "en-US": "en",
}

const langNameMap = {
    "zh-Hans":"简体中文",
    "zh-Hant":"繁體中文",
    "en":"English",
    "ja":"日本語",
}
const i18nPrefix = "i18n-";
const i18nOptionPrefix = "i18n-option-"
let currentLanguage = "";

function changeLanguage(langName) {
    let el = document.querySelector("html")
    el.lang = langName
    currentLanguage = langName;
    // 将语言选择器中被选中的语言设为高亮
    let options = document.getElementsByClassName("lang-option");
    for (let i = 0; i < options.length; ++i) {
        if (options[i].getAttribute("data-lang-name") === currentLanguage) {
            options[i].classList.add("lang-option-active");
        } else {
            options[i].classList.remove("lang-option-active");
        }
    }
    // 替换语言
    let lang = langs[langName];
    for (key in lang) {
        let idKey = i18nPrefix + key;
        let element = document.getElementById(idKey);
        if (element != null) {
            element.innerText = lang[key];
        }
    }
}

function initLanguage() {
    let language = localStorage.getItem("language");
    if (!language) {
        language = "zh-Hans"
        if (navigator.language) {
            for (let i = 0; i < navigator.languages.length; ++i) {
                if (langs[navigator.languages[i]] !== undefined) {
                    language = navigator.languages[i];
                    break;
                } else if (langs[langAliasMap[navigator.languages[i]]] !== undefined) {
                    language = langAliasMap[navigator.languages[i]];
                    break;
                }
            }
        }
    }
    changeLanguage(language);
}

function setLanguage(language) {
    localStorage.setItem("language", language);
    changeLanguage(language);
}

function initLangSelect() {
    // 为语言选择器添加点击事件，采用事件捕获的方式
    let selector = document.getElementById("i18n-lang-select");
    selector.onclick = function(event) {
        let target = event.target;
        if (target.className == "lang-option" && (!target.classList.contains("lang-option-active"))) {
            let langName = target.getAttribute("data-lang-name");
            setLanguage(langName);
        }
    }
    // 向语言选择器添加语言选项
    for (langName in langNameMap) {
        let optionId = i18nOptionPrefix + langName;
        let option = document.createElement("div");
        option.className = "lang-option";
        option.id = optionId;
        option.innerText = langNameMap[langName];
        option.setAttribute("data-lang-name", langName);
        selector.appendChild(option);
    }

}

// 初始化语言选择器的功能
initLangSelect();
// 根据以往选择或浏览器选项初始化当前语言，默认为简体中文
initLanguage();
