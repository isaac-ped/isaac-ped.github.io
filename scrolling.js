var PAGE_PER_I = 1000;

var boxes = [
    '#content_about',
    '#content_projects',
    '#content_set',
    '#content_hopfield',
    '#content_memo',
    '#content_pubs',
    '#content_links',
];

var projects_start = boxes.indexOf('#content_projects');
var projects_end = boxes.indexOf('#content_pubs');

var projects = [
    'content_set',
    'content_hopfield',
    'content_memo'
];

var project_icons = {
    'content_set': 'set_icon_box',
    'content_hopfield': 'hop_icon_box',
    'content_memo': 'memo_icon_box'
};

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

var set_box_pos = function(box_i, box) {
    var page_y = window.pageYOffset;
    var min_box_pos = box_i * PAGE_PER_I - 1000;

    if (projects.indexOf(box.attr('id'))>= 0) {
        var x = 2000  - 1885  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
    } else {
        var x = 2000  - 1955  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
    }
    box.css("margin-top", x + "px");
    return x;
}

var active_pos = function() {
    var page_y = window.pageYOffset

    for (var i=boxes.length - 1; i >= 0; i--) { 
        var min_box_pos = i * PAGE_PER_I - 1000;
        if (( 1 + Math.exp( - .01 * (page_y - min_box_pos))) < 1.01) {
            console.log(boxes[i], 'is active');
            return i;
        }
    }
}

var onscroll = function (e) {  
// called when the window is scrolled.  

    for (var i=0; i <= 6; i++) {
        set_box_pos(i, $(boxes[i]));
    }

    var active_i = active_pos();
    for (var i=projects_start+1; i < projects_end; i++) {
        var project_i = i - projects_start - 1;
        var project_box = project_icons[projects[project_i]]
        if (active_i == i) {
            $("#"+project_box).css("border-right-style", "none");
        } else {
            $("#"+project_box).css("border-right-style", "dotted");
        }

    }
} 

$('html').on('mousewheel', onscroll)
$('html').on('DOMMouseScroll', onscroll)
window.onscroll = onscroll;

onscroll();
