$(document).ready(function () {
    activateClickHandlers();
});

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


function activateClickHandlers() {
    $('.game-card').click(card_clicked);
}

function flip_card_back() {
    console.log("flip_card_back function called");
    $(first_card_clicked).find('.back').removeClass('hide');
    $(second_card_clicked).find('.back').removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;

}


function card_clicked() {
    $(this).find('.back').addClass('hide');
    if (first_card_clicked === null) {
        first_card_clicked = this;
    } else {
        second_card_clicked = this;

        if ($(first_card_clicked).find('.front > img').attr('src') === $(second_card_clicked).find('.front > img').attr('src')) {
            console.log("match");
            match_counter++
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                setTimeout(function () { alert('You win'); }, 500);


            }
        } else {
            console.log("no match");
            setTimeout(function () { flip_card_back(); }, 2000);


        }
    }
}
