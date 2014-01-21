// We need the hash to determine in-page location:
var hash = window.location.hash;

// we need to keep the autoscroll timeout so we can clear it:
var autoscroll_t;

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

// When DOM is ready:
$(function(){

    $(".internal-nav").click(function(e){
        e.preventDefault();
        var target = /#(.+)/.exec($(this).attr("href"))[1];
        var target_id = "nav-" + target;
        scrollBottomToElement("#" + target_id, 500, function(){
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

    $(window).scroll(function(){
        clearTimeout(autoscroll_t);
        // only set the timeout if the footer is not fully visible:
        var footer_bot = $("#nav-footer").offset().top + $("#nav-footer").outerHeight();
        var scroll_bot = $(document).scrollTop() + $(window).height();
        if (footer_bot > scroll_bot){
            autoscroll_t = setTimeout(function(){
                autoScroll(100, 200);
            }, 1000);
        }
    });

    $(".popoverize").popover({
        trigger: 'hover',
        container: 'body',
        placement: 'auto bottom'
    });

});
