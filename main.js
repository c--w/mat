onload = (event) => init();
var gamemode;
var opers = ['*', '/'];
var result; 
var count;
var start;
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
        if(val != result) {
            return;
        }
        count++;
        $('#count').text(count);
        $('#time').text(Math.floor((Date.now()-start)/1000)+'s');
        $('#avg').text(Math.floor((Date.now()-start)/1000/count)+'s');
        initGame();
    }
}
function changeGame() {
    gamemode = $("#gamemode").val();
    initGame();
}

function initGame() {
    let a = Math.floor(Math.random()*9)+2;
    let oper = Math.floor(Math.random()*2)
    let b = Math.floor(Math.random()*(gamemode-1))+2;
    if(opers[oper] == '*') {
        let i = Math.floor(Math.random()*2);
        $('#oper').text("*");
        if(i == 0) {
            $('#a').text(a);
            $('#b').text(b);
        } else {
            $('#a').text(b);
            $('#b').text(a);
        }
        result = eval(a+opers[oper]+b);
    } else {
        let r = a*b;
        let i = Math.floor(Math.random()*2);
        $('#a').text(r);
        $('#oper').text(":");
        if(i == 0) {
            $('#b').text(a);
            result = b;
        } else {
            $('#b').text(b);
            result = a;
        }
    }
}