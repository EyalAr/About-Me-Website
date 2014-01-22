/**
* If not hash is defined in the url, just fadeout the loading screen
* and fadein the welcome section.
* If there is a hash, scroll to the relevant section.
*/
var doWelcome = function(){
    if (hash != ""){
        // example: the section corresponding to the hash
        // 'contact' is 'nav-contact'
        var target = /#(.+)/.exec(hash)[1]; // ignore the '#' in the hash
        var target_id = "nav-" + target;
        // show the email box if needed:
        if (target == "email"){
            emailToggle(true);
            // scroll to the 'nav-contact' section because that's where
            // the email box is located.
            target_id = "nav-contact";
        }
        scrollBottomToElement("#" + target_id, 500, function(){
            $("#loading").fadeOut(1000);
        });
    }
    else{
        $("#loading").fadeOut(1000);
    }
}

/**
* If the distance between the bottom/top of the window to one of
* the nav-sections' bottom/top is lower than 'threshold', scroll the
* bottom/top of the screen to the bottom/top of this section.
*/
var autoScroll = function(threshold, speed){
    var scroll_top = $(document).scrollTop();
    var scroll_bot = scroll_top + $(window).height();
    $(".nav-section").each(function(i,e){
        var e_offset_top = $(this).offset().top;
        if (Math.abs(e_offset_top - scroll_top) <= threshold){
            $("body, html").animate({
                scrollTop: e_offset_top
            }, speed);
            return false; // stop the .each loop
        }
        var e_offset_bot = e_offset_top + $(this).outerHeight();
        if (Math.abs(e_offset_bot - scroll_bot) <= threshold){
            scrollBottomToElement($(this), speed);
            return false; // stop the .each loop
        }
    });
}

/**
* Toggle (with fade) visibility of the email box.
* show - show or hide = true / false
*/
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

/**
* Scroll the window such that the bottom of the element
* is aligned to the bottom of the window.
*
* element - the element to scroll to. Can be a jQuery object
*           or a string selector.
* cb - callback to execute when scrolling is completed
*/
var scrollBottomToElement = function(element, delay, cb){
    if (!(element instanceof jQuery)){
        element = $(element);
    }
    var scroll_top = element.offset().top
    + element.outerHeight()
    - $(window).height();
    $("body, html").animate({
        scrollTop: scroll_top
    },delay, cb);
}
