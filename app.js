var traits = {
    "intelligence" : 0,
    "kindness" : 0,
    "humor" : 0,
    "empathy" : 0,
    "extrovert" : 0,
    "logical" : 0,
    "organized" : 0
};
    

$(document).ready(function () { //function for when the html doc is ready
    $("a").on('click', function (event) { // event on click ( a (link) tag )
        if (this.hash !== "") {
            event.preventDefault(); // Prevent default anchor click behavior (home)
            var hash = this.hash;      // Store hash code
     
            $('html, body').animate({ // Using animate() to add animated page scroll
                scrollTop: $(hash).offset().top
            }, 900, function () {  // 900 millisec to scroll down
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
    
    $('.traits-input, .join-input').on("focusout", function () { // if input field empty - animate back t original place
        if (!$(this).val()) {
            $(this).siblings().removeClass('label-after').addClass('label-before').animate({top : "+=20px"});
        }
    });
    
    $('#traits-submit').prop('disabled', true);
    $('#traits-submit').css('background', '#323233');
    
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
            $(this).css("background-color", "#FFF");
            $('#points-left').show();
        }
        
        if (checkSum(traits) === 100) {  // if sum is exactly 100, enable the submit button
            $('#traits-submit').prop('disabled', false);
            $('#traits-submit').css('background', '#77dd77');
            $('#traits-submit').css('color', '#FFF');
        }
    });
    
    function checkTraits(traits) {  // check if the sum is more than 100 
        var sum = checkSum(traits);
        return sum <= 100;
    }
    
    function checkSum(traits) { // check and return the sum of the traits
        var sum = 0;
        for (var key in traits) {
            sum += traits[key];
        }
        return sum;
    }
    
    $('#join-form').submit(function (e) {  // append a new paragraph with quote name and age to members
        e.preventDefault();
       $('.members').append('<p> "' + $('#quote').val() + '" - ' + $('#name-input').val() + ', ' + $('#age').val() + '</p>');
    });
    
    $('.btn').click(function () { // add 1 to like or dislike depending on which button you press
        var label = $("label[for='"+$(this).attr('id')+"']");
        $(label).html(function (i, val) { return val * 1 + 1; });
        $(label).siblings().css( 'color', '#ffa32b');
    });
});

function submitForm() {
    for(var key in traits) {
        var name = key + "-bar";
        var divs = document.getElementById(name);
        divs.style.width = traits[key]*2 + "%";
        divs.style.backgroundColor = "#77dd77";
    }
    
    if(traits.intelligence < 35) {
        $('#message').append("Whoops, not enought intelligence to join our club.. Come back another time!");
        $('#submit-btn').prop('disabled', true);
        $('#submit-btn').css('background', '#323233');
    }

}
    
