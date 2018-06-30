$(document).ready(function () {
    shuffleImageArray(imagesLevelOne);
    create_gameboard(imagesLevelOne);
    displayOpeningModal()
    display_stats();
    activateClickHandlers();
    $('.a').addClass('hide');
});

function pickHouse() {
    var houses = ['hufflepuff', 'ravenclaw', 'slytherin', 'gryffindor'];
    var randomPick = houses[Math.floor(Math.random() * houses.length)];
    var x = $('header').addClass(randomPick);
    $('.house').text(randomPick);
    $('#chooseHouse').hide();
    setTimeout(function () { closeModal(); }, 1500);
    return x;
}

var imagesLevelOne = ['images/youngHarry.jpg', 'images/voldemort.png', 'images/snape.jpg', 'images/ronWeasley.jpg', 'images/quirinus-quirrel.jpg', 'images/malfoy.jpg', 'images/hermione.jpg', 'images/hagrid.jpg', 'images/albus_dumbledore.jpg', 'images/youngHarry.jpg', 'images/voldemort.png', 'images/snape.jpg', 'images/ronWeasley.jpg', 'images/quirinus-quirrel.jpg', 'images/malfoy.jpg', 'images/hermione.jpg', 'images/hagrid.jpg', 'images/albus_dumbledore.jpg'];

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function activateClickHandlers() {
    $('.game-card').click(card_clicked);
    $('#reset-btn').click(reset_game);
    $('#chooseHouse').click(pickHouse);
}
function flip_card_back() {
    console.log("flip_card_back function called");
    $(first_card_clicked).find('.back').removeClass('hide');
    $(second_card_clicked).find('.back').removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;
}
function card_clicked() {
    $('.a').removeClass('hide');
    animateDiv();
    if ($(this).find('.back').hasClass('hide')) {
        console.log('this card has already been clicked');
        return;
    }
    if (first_card_clicked !== null && second_card_clicked !== null) {
        return;
    }
    $(this).find('.back').addClass('hide');
    if (first_card_clicked === null) {
        first_card_clicked = this;
    } else {
        second_card_clicked = this;
        attempts++;

        console.log("attempts: ", attempts);
        if ($(first_card_clicked).find('.front > img').attr('src') === $(second_card_clicked).find('.front > img').attr('src')) {
            match_counter++;
            matches++;
            accuracy = Math.round(matches / attempts * 100) + '%';
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                setTimeout(function () { displayModal(); }, 500);
            }
        } else {

            display_stats();
            setTimeout(function () { flip_card_back(); }, 2000);
        }
    }
}
function display_stats() {
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
    $('.games-played .value').text(games_played);

}
function resetStats() {
    matches = 0;
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
    display_stats();
}
function reset_game() {
    console.log("reset button clicked");
    games_played++;
    resetStats();
    $('.game-card').find('.back').removeClass('hide');
    console.log("games played: ", games_played);
    shuffleImageArray(imagesLevelOne);
    create_gameboard(imagesLevelOne);
    activateClickHandlers();

}

function create_gameboard(imageArray) {
    $('.card_container').empty();
    for (var pictureIndex = 0; pictureIndex < imageArray.length; pictureIndex++) {

        var create_game_card = $('<div>').addClass('game-card');
        var create_back = $('<div>').addClass('back');
        create_back.append($('<img src=' + '"images/card-back.png"' + '>'));
        create_game_card.append(create_back);

        var create_front = $('<div>').addClass('front');
        //$(<'img'>).attr('src', array[i])
        create_front.append($('<img src=' + '"' + imageArray[pictureIndex] + '"' + '>'));
        create_game_card.append(create_front);

        $('.card_container').append(create_game_card);

    }

}

function shuffleImageArray(array) {
    for (var pictureIndex = array.length - 1; pictureIndex > 0; pictureIndex--) {
        var randomPick = Math.floor(Math.random() * (pictureIndex + 1));
        var temp = array[pictureIndex];
        array[pictureIndex] = array[randomPick];
        array[randomPick] = temp;
    }
}

function displayModal() {
    $('#myModal').modal('show');

}

function displayOpeningModal() {
    $('#openingModal').modal('show');

}

function closeModal() {
    $('#openingModal').modal('hide');
}

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 263;
    var w = $(window).width() - 500;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv() {
    var newq = makeNewPosition();
    var oldq = $('.a').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $('.a').animate({ top: newq[0], left: newq[1] }, speed, function () {
        animateDiv();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.4;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}
