var PAGE_PER_I = 1000;

var boxes = {
    1: '#content_projects',
    2: '#content_set',
    3: '#content_hopfield',
    4: '#content_memo',
    5: '#content_pubs',
    6: '#content_links',
};

var projects = [
    'content_set',
    'content_hopfield',
    'content_memo'
];

var hamburger_on = false;

var toggle_hamburger = function() {
    if (hamburger_on) {
        $('#nav_box').animate({'right': "-10em"});
        hamburger_on = false;
    } else {
        $('#nav_box').animate({"right": "-5px"});
        hamburger_on = true;
    }
}

var scroll_to = function(box_i, noclose) {
    if (!noclose && hamburger_on) {
        toggle_hamburger();
    }
    $('body').scrollTo((box_i) * PAGE_PER_I - 200, {duration: 1000});
}

var set_box_pos = function(box_i, box, page_y) {
    var min_box_pos = box_i * PAGE_PER_I - 1000;

    if (projects.indexOf(box.attr('id'))>= 0) {
        var x = 2000  - 1885  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
    } else {
        var x = 2000  - 1955  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
    }
    console.log(box.attr('id'), "x", x);
    box.css("margin-top", x + "px");
    return x;
}

var onscroll = function (e) {  
// called when the window is scrolled.  
    var y = window.pageYOffset;
    console.log(e);
    $( "#counter").html(y);

    set_box_pos(0, $( "#content_about"), 10000);
    for (var i=0; i <= 6; i++) {
        set_box_pos(i, $(boxes[i]), y);
    }
} 

$('html').on('mousewheel', onscroll)
$('html').on('DOMMouseScroll', onscroll)
window.onscroll = onscroll;

onscroll();
