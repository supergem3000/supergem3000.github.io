const zhHans = {
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
    "g-space": "G-SPACE",
    "articles": "Articles",
    "thinkings": "Thinkings",
    "article-list": "Article List",
    "thinking-list": "Thinking List",
    "catalog": "Catalog",
    "overdue-warning-p1": "This article was posted ",
    "overdue-warning-p2": " days ago and may out of date. Please judge by yourself.",
};
const jp = {
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
    "zh-CN": zhHans,
    "zh-Hant": zhHant,
    "zh-HK": zhHant,
    "zh-TW": zhHant,
    "en": en,
    "en-US": en,
    "jp": jp,
}
const i18nPrefix = "i18n-";

function changeLanguage(langName) {
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
            if (langs[navigator.language] !== undefined) {
                language = navigator.language;
            } else {
                for (let i = 0; i < navigator.languages.length; ++i) {
                    if (langs[navigator.languages[i]] !== undefined) {
                        language = navigator.languages[i];
                    }
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

initLanguage();
