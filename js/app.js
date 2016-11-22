var traits = {
    "intelligence" : 0,
    "kindness" : 0,
    "humor" : 0,
    "empathy" : 0,
    "extrovert" : 0,
    "logical" : 0,
    "organized" : 0
};

var smartEnough = false;
    
$(document).ready(function () {
    
    $('input[type="submit"]').prop('disabled', true);  // default submit behavior
    $('input[type="submit"').css('background', '#323233');
    
    $("a").on('click', function (e) { // event on click ( a (link) tag )
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;      // Store hash code
     
            $('html, body').animate({ // Using animate() to add animated page scroll
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;  // Add hash (#) to URL when done scrolling 
            });
        }
    });
    
    $('#name-input').on("keydown", function (e) { // function for updating the name of the user
        if (e.keyCode === 13) {
            $('h2').remove();
            e.preventDefault(); // prevent from scrolling to top and add new h2
            $('h1').append("<h2> Let's get to it <br>" + $('#name-input').val() + " </h2> ");
            $('#name-input').hide();
        }
    });
    
    $('.traits-input, .join-input').on("focus", function () { // animate form
        if (!$(this).val()) {
            $(this).siblings().removeClass('label-before').addClass('label-after').animate({top : "-=20px"});
        }
    });
    
    $('.traits-input, .join-input').on("focusout", function () { // if field empty, animate back to original place
        if (!$(this).val()) {
            $(this).siblings().removeClass('label-after').addClass('label-before').animate({top : "+=20px"});
        }
    });
    
    $('.traits-input').change(function () { // keep track of numbers used 
        var points = $('#points').text();
        var traitID = $(this).attr('id');
        
        traits[traitID] = Number($(this).val());
        
        if (!checkTraits(traits)) { // if points > 100 
            $(this).css("background-color", "#ff6f59");
            $('#points').text("You can only use 100 points!");
            $('#points-left').hide();
        } else {  // show how many points are left and set the background back to white if earlier put too many
            points -= $(this).val();
            $('#points').text(100 - checkSum(traits));
            $('.traits-input').css("background-color", "#FFF");
            $('#points-left').show();
        }
        
        if (checkSum(traits) === 100) {  // if sum is exactly 100, enable the submit button
            $('#traits-submit').prop('disabled', false);
            $('#traits-submit').css('background', '#77dd77');
        }
    });
    
    
    $('#join-form').submit(function (e) {  // append a new paragraph with quote name and age to members
        e.preventDefault();
        $('.members').append('<p> "' + $('#quote').val() + '" - ' + $('#name-input').val() + ', ' + $('#age').val() + '</p>');
    });
    
    $('.btn').click(function () { // add 1 to like or dislike depending on which button you press
        var label = $('label[for="' + $(this).attr('id') + '"]');
        $(label).html(function (i, val) { return val * 1 + 1; });
        $(label).siblings().css('color', '#ffa32b');
        $(this).siblings().prop('disabled', true);
        $(this).prop('disabled', true);
        imageAnswer();
    });
    
});

function checkSum(traits) { // check and return the sum of the traits
    var sum = 0;
    for (var key in traits) {
        sum += traits[key];
    }
    return sum;
}

function checkTraits(traits) {  // check if the sum is more than 100 
    var sum = checkSum(traits);
    return sum <= 100;
}
    
function submitForm() {  // Function to make the graph for traits
    for (var key in traits) {
        var name = key + "-bar";
        var divs = document.getElementById(name);
        divs.style.width = traits[key] + "%";
        divs.style.backgroundColor = "#77dd77";
    }
    
    if (traits.intelligence < 35) {  // check so intelligence is high enough
        $('#message').append("Whoops, not enought intelligence to join our club.. Come back another time! (Or refresh the page..)");
        $('#message').addClass('message-box');
    } else {
        smartEnough = true;
        console.log(smartEnough);
    }
}

function imageAnswer() {  // if answer right on pictures + intellgence > 35
    var firstCorrectAnswer = $('label[for="second-answer"]').text();
    console.log(firstCorrectAnswer);
    var secondCorrectAnswer = $('label[for="third-answer"]').text();
    console.log(secondCorrectAnswer);
    if (smartEnough && firstCorrectAnswer == 11 && secondCorrectAnswer == 13) {
        console.log("hello");
        $('#join-submit').prop('disabled', false);
        $('#join-submit').css('background', '#77dd77');
    }
}

