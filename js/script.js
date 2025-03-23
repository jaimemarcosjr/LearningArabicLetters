var httpRequest, callBackFunc, globalAudio = null,
    currentMenuSection = "",
    isIE = window.navigator.userAgent.indexOf("MSIE ") >= 0 || window.navigator.userAgent.indexOf("Trident") >= 0,
    delta = 5;

function MA_AppendScript(t, e) {
    var n = document.createElement("script");
    n.type = "text/javascript", n.src = t, document.getElementById(e).appendChild(n)
}

function addCanonical(t) {
    var e = document.querySelector("head"),
        n = document.createElement("link");
    n.setAttribute("rel", "canonical"), n.setAttribute("href", t), e.appendChild(n)
}

function reportProblem() {
    location.href = "/contact/" + Base64.encode(location.href)
}

function playSound(t, e) {
    null == globalAudio ? globalAudio = new Audio(t) : (stopSound(), globalAudio.src = t), e && (globalAudio.onended =
        e), globalAudio.play()
}

function stopSound() {
    globalAudio && (globalAudio.pause(), globalAudio.currentTime = 0)
}

function getLessonInfo(t) {
    var e = /L([0-9]+)_([0-9]+)\.html/i.exec(t);
    return null !== e ? e : []
}

function padZeros(t) {
    for (var e = t.length, n = t, o = 0; o < 3 - e;) n = "0" + n, o++;
    return n
}

function isArabic(t) {
    for (var e = 0, n = 0, o = 0; o < t.length; o++) {
        var r = t.charCodeAt(o);
        isPunctuation(r) || (e++, r > 255 && n++)
    }
    return Math.ceil(n / e * 100) >= 80
}

function isPunctuation(t) {
    return t > 31 && t < 65 || t > 90 && t < 97 || t > 122 && t < 127
}

function isNumeric(t) {
    return !isNaN(parseFloat(t)) && isFinite(t)
}

function highlightQuestion(t, e) {
    t.id != "qst_" + currentQuestion && (t.style.backgroundColor = "var(--bkg)")
}

function writeScore() {
    (t = document.getElementById("rslt")).style.display = "table";
    var t = document.getElementById("result"),
        e = Math.round(score / total * 100);
    t.innerHTML = 'You scored <span class="qstscore">' + score + '</span> out of <span class="qstscore">' + total +
        '</span>, your percentage score was <span  class="qstscore">' + e +
        "%</span><br />Any corrections to incorrect answers are marked in red"
}

function loadXMLDoc(t, e) {
    if (callBackFunc = e, window.XMLHttpRequest)(httpRequest = new XMLHttpRequest).overrideMimeType && httpRequest
        .overrideMimeType("text/xml");
    else if (window.ActiveXObject) try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (t) {
        try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    httpRequest && (httpRequest.onreadystatechange = onResponse, httpRequest.open("GET", t, !0), httpRequest.send(""))
}

function onResponse() {
    if (4 == httpRequest.readyState && 200 == httpRequest.status) {
        var t = httpRequest.responseXML;
        walk(t), callBackFunc(t)
    }
}

function walk(t) {
    var e, n;
    switch (t.nodeType) {
        case 3:
            /^\s*$/.test(t.nodeValue) && t.parentNode.removeChild(t);
            break;
        case 1:
        case 9:
            for (e = t.firstChild; e;) n = e.nextSibling, walk(e), e = n;
            break
    }
}

function gotoWebinar(t) {
    window.location = "/gtw/index.php?w=" + t
}

function gotoApp() {
    document.location.href = "https://itunes.apple.com/us/app/imadinaharabic-for-iphone/id632954089?mt=8"
}

function maIsMobile() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream ? "IOS" : /android/.test(navigator
        .userAgent.toLowerCase()) && !window.MSStream ? "ANDROID" : ""
}

function maIsIOSSafari() {
    var t = window.navigator.userAgent,
        e = !!t.match(/iPad/i) || !!t.match(/iPhone/i),
        n = !!t.match(/WebKit/i);
    return !(!e || !n || t.match(/CriOS/i))
}

function getWindowWidth() {
    let t = window.document.documentElement.clientWidth,
        e = window.document.body;
    return "CSS1Compat" === window.document.compatMode && t || e && e.clientWidth || t
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (t) {
        var e, n, o, r, a, i, c, d = "",
            s = 0;
        for (t = Base64._utf8_encode(t); s < t.length;) r = (e = t.charCodeAt(s++)) >> 2, a = (3 & e) << 4 | (n = t
                .charCodeAt(s++)) >> 4, i = (15 & n) << 2 | (o = t.charCodeAt(s++)) >> 6, c = 63 & o, isNaN(n) ? i = c =
            64 : isNaN(o) && (c = 64), d = d + this._keyStr.charAt(r) + this._keyStr.charAt(a) + this._keyStr.charAt(
                i) + this._keyStr.charAt(c);
        return d
    },
    decode: function (t) {
        var e, n, o, r, a, i, c = "",
            d = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < t.length;) e = this._keyStr.indexOf(t.charAt(d++)) << 2 |
            (r = this._keyStr.indexOf(t.charAt(d++))) >> 4, n = (15 & r) << 4 | (a = this._keyStr.indexOf(t.charAt(
                d++))) >> 2, o = (3 & a) << 6 | (i = this._keyStr.indexOf(t.charAt(d++))), c += String.fromCharCode(e),
            64 != a && (c += String.fromCharCode(n)), 64 != i && (c += String.fromCharCode(o));
        return c = Base64._utf8_decode(c)
    },
    _utf8_encode: function (t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "", n = 0; n < t.length; n++) {
            var o = t.charCodeAt(n);
            o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192),
                e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224), e += String
                .fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128))
        }
        return e
    },
    _utf8_decode: function (t) {
        for (var e = "", n = 0, o = c1 = c2 = 0; n < t.length;)(o = t.charCodeAt(n)) < 128 ? (e += String
            .fromCharCode(o), n++) : o > 191 && o < 224 ? (c2 = t.charCodeAt(n + 1), e += String.fromCharCode((31 &
            o) << 6 | 63 & c2), n += 2) : (c2 = t.charCodeAt(n + 1), c3 = t.charCodeAt(n + 2), e += String
            .fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
        return e
    }
};

function MA_List_Init() {
    document.querySelectorAll('.ma_side_list a[href="#"]').forEach(e => {
        e.addEventListener("click", function (t) {
            t.preventDefault(), t.stopPropagation(), this == t.currentTarget && MA_List_toggle(e)
        }), MA_List_Collapse(e)
    }), MA_List_toggle(document.querySelector(".masel").parentElement.parentElement.previousElementSibling, !0);
    let e = document.querySelector(".ma_side_list_cnt"),
        t = e.clientWidth - e.offsetWidth;
    t = t < -15 ? t : -15, e.style.right = t + "px", MA_List_Focus(), window.scrollTo(0, 0);
    let n = document.querySelector(".ma_side_list");
    n.style.visibility = "visible", n.focus()
}

function MA_List_toggle(e, t) {
    if (!e) return;
    let n = e.parentElement;
    n.classList.contains("expanded") ? MA_List_Collapse(e) : MA_List_Expand(e), n.classList.toggle("expanded"), t && (
        n.parentElement && MA_List_toggle(n.parentElement.previousElementSibling), n.parentElement.parentElement && n
        .parentElement.parentElement.parentElement && MA_List_toggle(n.parentElement.parentElement.parentElement
            .previousElementSibling))
}

function MA_List_Expand(e) {
    e && (e.querySelector(".maarw") && (e.querySelector(".maarw").innerHTML = "▾ "), e.parentElement.querySelector(
        ":scope > ul") && (e.parentElement.querySelector(":scope > ul").style.display = "block"))
}

function MA_List_Collapse(e) {
    e && (e.querySelector(".maarw") && (e.querySelector(".maarw").innerHTML = "▸ "), e.parentElement.querySelector(
        ":scope > ul") && (e.parentElement.querySelector(":scope > ul").style.display = "none"))
}

function MA_List_Focus() {
    let e = document.querySelector(".masel");
    e && (e = e.parentElement.parentElement.previousElementSibling) && e.scrollIntoView()
}



// Function to shuffle array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomizeLetters() {
    const row = document.querySelector(".row");
    const cols = Array.from(row.querySelectorAll(".col-4"));
    const shuffled = shuffleArray(cols);

    // Remove current columns
    cols.forEach(col => row.removeChild(col));

    // Append shuffled columns back
    shuffled.forEach(col => row.appendChild(col));
}

function hideTransiliteration() {
    const button = document.getElementById('toggleTransiliterationBTN');
    const currentText = button.innerHTML.trim();

    if (currentText === "Hide Transliteration") {
        // Hide elements with class "transliteration"
        document.querySelectorAll('.transliteration').forEach(element => {
            element.style.display = 'none';
        });
        document.querySelectorAll('.latin-letter').forEach(element => {
            element.style.display = 'none';
        });

        button.innerHTML = "Show Transliteration";
    } else {
        // Remove inline "display" property to show them again
        document.querySelectorAll('.transliteration').forEach(element => {
            element.style.removeProperty('display');
        });

        document.querySelectorAll('.latin-letter').forEach(element => {
            element.style.removeProperty('display');
        });
        button.innerHTML = "Hide Transliteration";
    }
}