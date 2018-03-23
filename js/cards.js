var cardTypes=["anchor", "ambulance", "birthday-cake", "motorcycle", "umbrella", "space-shuttle"];
var openCards=[];
var cards = [];
var score = 0;
var moves = 0;
var timer;

$(document).ready(function(){
    startGame();
});

function startGame(){
    clearBoard();
    cards=createCards();
    shuffle(cards);
    appendToDeck(cards);
}

function clearBoard(){
    cards=[];
    openCards=[];
    score=0;
    moves=0;
    clearInterval(timer);
    updateScore(score);
    $('.board').empty();
    $("#seconds").empty();
    $("#minutes").empty();
}

function appendToDeck(cards){
    for(var i=0;i<cards.length;i++){
        cards[i].appendTo('.board');
    }
}

function toggleDisplayCard(obj){
    obj.classList.toggle("open");
    obj.firstChild.classList.toggle("cardTypeVisible");
}

function showModal(){
    $(".modal").addClass("is-active");
}

function hideModal(){
    $(".modal").removeClass("is-active");
}

function disable(){
    $('.card').off('click');
}

function enable(){
    $('.card').each(function(){
        if(!$(this).hasClass('open')){
            $(this).click(function(){handleClick(this)});
        }
    })
}

function handleClick(obj){
    updateMoveCount();
    toggleDisplayCard(obj);
    openCards.push(obj);
    if(openCards.length == 2){
        var match = isMatch();
        disable();
        setTimeout(function(){
            handlePair(match);
            enable();}, 1000);   
    }
}

function updateMoveCount(){
    moves++;
    if(moves==1){
        startTimer();
    }
}

function createCards(){
    var allCards = [];
    for(var i=0;i<6;i++){
        var cardType = cardTypes[i];
        for(var j=0;j<2;j++){
            var card =   $('<div/>', {
                'id':'myDiv',
                'class':'card',
            }).on('click', function(){
                handleClick(this); // myDiv
            }).append('<i class="cardType fas fa-'+cardType+'"></i>');
            allCards.push(card);
        }}
    return allCards;
};

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function isMatch(){
    return openCards[0].firstChild.classList.toString() == openCards[1].firstChild.classList.toString();
}

function updateScore(value){
    $('#score-val').html(value);
    if(score == cardTypes.length){
        showModal();
        clearInterval(timer);
    }
}

function handlePair(match){
    if(match){
        $(openCards[0]).unbind('click');
        $(openCards[1]).unbind('click');
        updateScore(++score);
    }else{
        toggleDisplayCard(openCards[0]);
        toggleDisplayCard(openCards[1]);
    }
    openCards=[];
}

function startTimer(){ 
    var sec = 0;
    function pad (val) { 
        return val > 9 ? val : "0" + val; 
    }
    timer = setInterval( function(){
        $("#seconds").html(pad(++sec%60));
        $("#minutes").html(pad(parseInt(sec/60,10)));
    }, 1000);
}