$(document).ready(startUp);

function startUp() {
    shuffleImageArray(imagesLevelOne);
    create_gameboard(imagesLevelOne);
    display_stats();
    $('.snitch').removeClass('hide');
    activateClickHandlers();
}

function pickHouse() {
    var houses = ['Hufflepuff', 'Ravenclaw', 'Slytherin', 'Gryffindor'];
    var randomPick = houses[Math.floor(Math.random() * houses.length)];
    var x = $('header').addClass(randomPick);
    $('.house').text(randomPick);
    playSound(randomPick);
    $('#chooseHouse').hide();
    setTimeout(function () { $('.modalShadow.showModal').removeClass('showModal'); }, 2000);
    return x;
}

var imageArray = ['images/youngHarry.jpg', 'images/voldemort.png', 'images/snape.jpg', 'images/ronWeasley.jpg', 'images/quirinus-quirrel.jpg', 'images/malfoy.jpg', 'images/hermione.jpg', 'images/hagrid.jpg', 'images/albus_dumbledore.jpg'];
var imagesLevelOne = imageArray.concat(imageArray);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var audioSwitch = 0;

function activateClickHandlers() {
    $('.game-card').click(card_clicked);
    $('#reset-btn').click(reset_game);
    $('#chooseHouse').click(pickHouse);
    $('.snitch').click(removeSnitch);
    $('.modalShadow').click(closeWinModal);
    $('.soundOn').click(function () { audioSwitch = 1 - audioSwitch });

}
function flip_card_back() {
    $(first_card_clicked).find('.back').removeClass('hide');
    $(second_card_clicked).find('.back').removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;
}
function card_clicked() {
    animateDiv();
    if ($(this).find('.back').hasClass('hide')) {
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

        if ($(first_card_clicked).find('.front > img').attr('src') === $(second_card_clicked).find('.front > img').attr('src')) {
            match_counter++;
            matches++;

            if ($(first_card_clicked).find('.front > img').attr('src') === "images/voldemort.png") {
                playSound("destroy");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/youngHarry.jpg") {
                playSound("loveMagic");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/ronWeasley.jpg") {
                playSound("wicked");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/albus_dumbledore.jpg") {
                playSound("dumbledore");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/malfoy.jpg") {
                playSound("draco");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/hermione.jpg") {
                playSound("hermione");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/hagrid.jpg") {
                playSound("hagrid");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/quirinus-quirrel.jpg") {
                playSound("quirrel");
            }
            if ($(first_card_clicked).find('.front > img').attr('src') === "images/snape.jpg") {
                playSound("snape");
            }
            accuracy = Math.round(matches / attempts * 100) + '%';
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                setTimeout(function () { displayModal(); }, 1000);
                $('iframe').attr('src', "https://www.youtube.com/embed/LzqdrHq-orc?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1&amp;");
            }
        } else {
            if (matches > 0) {
                accuracy = Math.round(matches / attempts * 100) + '%';
            }
            display_stats();
            setTimeout(function () { flip_card_back(); }, 1800);
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
    games_played++;
    resetStats();
    $('.game-card').find('.back').removeClass('hide');
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
    $('.endModal').addClass('showModal');
}

function closeWinModal() {
    $('.endModal.modalShadow.showModal').removeClass('showModal');
    $('iframe').attr('src', "");
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
    var oldq = $('.snitch').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $('.snitch').animate({ top: newq[0], left: newq[1] }, speed, function () {
        animateDiv();
    });
}

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;
    var speedModifier = .8;
    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}

function removeSnitch() {
    $('.snitch').addClass('hide');
}

var sounds = {
    "Gryffindor": {
        url: "sound/gryff.mp3"
    },
    "Hufflepuff": {
        url: "sound/huff.mp3"
    },
    "Ravenclaw": {
        url: "sound/raven.mp3"
    },
    "Slytherin": {
        url: "sound/slyth.mp3"
    },
    "destroy": {
        url: "sound/destroy.mp3"
    },

    "loveMagic": {
        url: "sound/loveMagic.mp3"
    },

    "wicked": {
        url: "sound/wicked.mp3"
    },

    "dumbledore": {
        url: "sound/goodluck.mp3"
    },

    "draco": {
        url: "sound/draco.mp3"
    },

    "snape": {
        url: "sound/excuse.mp3"
    },

    "hermione": {
        url: "sound/leviosa.mp3"
    },

    "hagrid": {
        url: "sound/hagrid.mp3"
    },

    "quirrel": {
        url: "sound/troll2.mp3"
    }
}

function playSound(sound) {
    var audio = new Audio(sounds[sound].url);
    if (audioSwitch === 1) {
        audio.play(sound);
    }
}


