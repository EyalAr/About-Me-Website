// We need the hash to determine in-page location:
var hash = window.location.hash;

// **************************************
// Preload images;
(function(images_urls){
    var images = [];
    for (var i = 0 ; i < images_urls.length ; i++)
    {
        images[i] = new Image();
        images[i].src = images_urls[i];
    }
})([
'imgs/me.png',
]);
// **************************************

var doWelcome = function(){
    if (hash != ""){
        $("#loading").hide();
        $("#nav-welcome").show();
        var target = /#(.+)/.exec(hash)[1];
        var target_id = "nav-" + target;
        if (target == "email"){
            emailToggle(true);
            target_id = "nav-contact";
        }
        scrollBottomToElement("#" + target_id);
    }
    else{
        $("#loading").fadeOut(1000);
        $("#nav-welcome").fadeIn(1000);
        // I'm not fading in with a callback because I want the
        // fades to occur together.
    }
}

// **************************************
// Load fonts from Google:
WebFontConfig = {
    google: { families: ['Zeyada::latin', 'Nothing+You+Could+Do::latin', 'Gruppo::latin']},
    active: doWelcome
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
// **************************************

var emailToggle = function(show){
    if (show){
        $("#nav-contact-icons").fadeToggle(500, function(){
            $("#nav-email").fadeToggle(500);
        });
    }
    else{
        $("#nav-email").fadeToggle(500, function(){
            $("#nav-contact-icons").fadeToggle(500);
        });
    }
}

var scrollBottomToElement = function(selector, cb){
    var scroll_top = $(selector).offset().top
    + $(selector).outerHeight()
    - $(window).height();
    $("body, html").animate({
        scrollTop: scroll_top
    },500, cb);
}

$(function(){
    $(".internal-nav").click(function(e){
        e.preventDefault();
        var target = /#(.+)/.exec($(this).attr("href"))[1];
        var target_id = "nav-" + target;
        scrollBottomToElement("#" + target_id, function(){
            window.location.hash = target;
        });
    });

    // **********************************
    // Handle email box visibility:

    $("#email-link").click(function(){
        emailToggle(true);
    });

    $("#close-email-link").click(function(){
        emailToggle(false);
    });

    // Close the email box when clicked outside:
    $(document).click(function(e) { 
        if($(e.target).parents().index($('#nav-email')) == -1) {
            if($('#nav-email').is(":visible")) {
                emailToggle(false);
            }
        }        
    })
    // **********************************

    $(".hover-replace")
    .mouseenter(function(){
        var alt_el = $(this).find(".alt-content"); //alternative content
        var prm_el = $(this).find(".prm-content"); //primary content
        if (!alt_el.is(":visible")){
            prm_el.fadeOut(100, function(){
                alt_el.fadeIn(100).css('display','table');
            });
        }
    })
    .mouseleave(function(){
        var alt_el = $(this).find(".alt-content"); //alternative content
        var prm_el = $(this).find(".prm-content"); //primary content
        if (!prm_el.is(":visible")){
            alt_el.fadeOut(100, function(){
                prm_el.fadeIn(100);
            });
        }
    });
});