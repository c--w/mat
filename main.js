onload = (event) => init();
var gamemode;
var opers = ['*', '/'];
var result;
var count;
var start;
var questions_mult = [
    "Ako su faktori # i $ rezultat je: ",
    "Koji je broj # puta veći od broja $: ",
    "Ako je djeljitelj # a količnik je $, djeljenik je: ",
    "NAME je kupila # IN. IN košta $ kuna. Koliko je ukupno platila: ",
    "Svaki CONT sadrži # IN. Ima $ CONT. Koliko ima ukupno IN: "
];
var questions_div = [
    "Ako je faktor # a umnožak &, drugi faktor je: ",
    "Izračunaj broj # puta manji od broja &: ",
    "NAME ima ukupno & IN. Složila ih je u # CONT. Koliko ima u svakom CONT: ",
    "NAME je potrošila & kuna. Kupila je # IN. Koliko kuna košta jedan IN: ",
    "NAME je imala & IN. Podijelila ih je prijateljicama. Ona ima # prijateljica. Koliko je svaka dobila: ",
    "NAME je imala & IN. Podijelila ih je prijateljicama. Ona ima # prijateljica. Koliko je svaka dobila: ",
];
var ime = ['Ani', 'Ema', 'Mia', 'Una', 'Dunja', 'Ana', 'Petra', 'Davorka', 'Baka'];
var predmet = ['bombon', 'žvaka', 'lizalica', 'sladoled', 'olovka', 'bojica', 'gumica'];
var container = ['kutija', 'vrećica', 'torba', 'ladica', 'košara', 'posuda'];

function init() {
    start = Date.now();
    gamemode = $("#gamemode").val();
    initGame();
    $("#gamemode").on("change", changeGame);
    $('#result').on("keyup", check);
    correct = 0;
    count = 0;
    $('#result').focus();
}

function check(event) {
    if (event.keyCode === 13) {
        let val = $("#result").val();
        $('#result').val('');
        if (val != result) {
            return;
        }
        count++;
        $('#count').text(count);
        $('#time').text(Math.floor((Date.now() - start) / 1000) + 's');
        $('#avg').text(Math.floor((Date.now() - start) / 1000 / count) + 's');
        initGame();
    }
}
function changeGame() {
    gamemode = $("#gamemode").val();
    initGame();
}

function initGame() {
    let a = Math.floor(Math.random() * 9) + 2;
    let oper = Math.floor(Math.random() * 2)
    let b = Math.floor(Math.random() * (gamemode - 1)) + 2;
    let r;
    if (opers[oper] == '*') {
        let i = Math.floor(Math.random() * 2);
        $('#oper').text("*");
        if (i == 0) {
            $('#a').text(a);
            $('#b').text(b);
        } else {
            $('#a').text(b);
            $('#b').text(a);
        }
        result = eval(a + opers[oper] + b);
        r = result;
    } else {
        r = a * b;
        let i = Math.floor(Math.random() * 2);
        $('#a').text(r);
        $('#oper').text(":");
        if (i == 0) {
            $('#b').text(a);
            result = b;
        } else {
            $('#b').text(b);
            result = a;
            a = b;
            b = result;
        }
    }
    let text = Math.floor(Math.random() * 2);
    //text = 1;
    if(text == 0) {
        $("#task-num").show();
        $("#task-text").hide();
    } else {
        $("#task-text").show();
        $("#task-num").hide();
        let question;
        if(oper == 0) {
            question = getRandomElem(questions_mult);
        } else {
            question = getRandomElem(questions_div);
        }
        question = replaceAll(question, a, b, r);
        $("#task-text").html(question);
    }

}

function replaceAll(q, a, b, r) {
    q = q.replaceAll("#", a);
    q = q.replaceAll("$", b);
    q = q.replaceAll("&", r);
    if(q.includes("CONT")) {
        let x = getRandomElem(container) 
        q = q.replaceAll("CONT", x);
    }
    if(q.includes("NAME")) {
        let x = getRandomElem(ime) 
        q = q.replaceAll("NAME", x);
    }
    if(q.includes("IN")) {
        let x = getRandomElem(predmet) 
        q = q.replaceAll("IN", x);
    }
    if(q.includes("PREDMET")) {
        let x = getRandomElem(predmet) 
        q = q.replaceAll("IN", x);
    }
    return q;    
}
function getRandomElem(a) {
    return a[Math.floor(Math.random()*a.length)]
}