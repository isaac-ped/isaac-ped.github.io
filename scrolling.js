var PAGE_PER_I = 800;

var boxes = [
    '#content_about',
    '#content_projects',
    '#content_pubs',
];

var projects_start = boxes.indexOf('#content_projects');
var projects_end = boxes.indexOf('#content_pubs');

var projects = [
    'content_shre',
    'content_set',
    'content_hopfield',
    'content_bagel',
    'content_memo',
    'content_art',
    'content_sl'
];

var box_links = {
    'content_projects':  projects
};

var project_icons = {
    'content_shre': 'shre_icon_box',
    'content_set': 'set_icon_box',
    'content_bagel': 'bagel_icon_box',
    'content_hopfield': 'hop_icon_box',
    'content_memo': 'memo_icon_box',
    'content_art': 'art_icon_box',
    'content_sl': 'sl_icon_box'
};

var permanent_sidebar = function() {
    return screen.width > 900;
}

var toggle_hamburger = function() {
    set_hamburger(!hamburger_on);
}

var set_hamburger = function(on) {
    console.log('setting habbagah', on);
    if (!on) {
        $('#nav_box').animate({'right': "-10em"});
        hamburger_on = false;
    } else {
        $('#nav_box').animate({"right": "-5px"});
        hamburger_on = true;
    }
}

set_hamburger(permanent_sidebar());

var unshow_other_proj = function(proj_name) {
    for (var i=0; i < projects.length; i++)  {
        if (projects[i] != proj_name) {
            $('#'+projects[i]).fadeOut(200);
            $('#' + project_icons[projects[i]]).css('border-right-style', 'dotted');
            $('#'+projects[i]).css('z-index', 1);
        }
    }
}

var show_proj = function(proj_name) {
    for (var i=0; i < projects.length; i++)  {
        if (projects[i] == proj_name) {
            $('#'+projects[i]).css('z-index', 2);
            $('#'+projects[i]).fadeIn(200, function() { unshow_other_proj(proj_name);});
            $('#' + project_icons[projects[i]]).css('border-right-style', 'none');
        } else {
            $('#'+projects[i]).css('z-index', 1);
        }
    }
}
unshow_other_proj('');


var scroll_to = function(box_i, noclose) {
    if (!noclose && hamburger_on && !permanent_sidebar()) {
        toggle_hamburger();
    }
    var minus = -.25*$(window).height() - $('#content_projects').height()
    minus = Math.min(minus, 0)
    $('body').scrollTo((box_i / boxes.length * ($('body').height() + minus)), {duration: 1000});
}

var set_box_pos = function(box_i, box) {
    var pct = window.pageYOffset / $('body').height();
    var box_pct = (box_i-1) / boxes.length;
    //var min_box_pos = (box_i) / boxes.length;// * PAGE_PER_I;

    var box_id = box.attr('id');

    var xmax = 200

    var x = 200 - xmax / ( 1 + Math.exp( - 25* (pct - box_pct)));
    if (box_id in box_links) {
        links = box_links[box_id];
        for (var i=0; i < links.length; i++) {
            $(`#${links[i]}`).css('margin-top', `calc(100px + ${x}vh)`)
        }
    }

    var y = 50;

    if (box.height() - $(window).height() > 0 && x < .2 && box_i == 2) {

        var min_y = (Math.log((xmax/(200-.2)) - 1) / -25 + box_pct) * $('body').height();
        var max_offset = min_y - ($('body').height() - $(window).height());

        var offset = min_y - window.pageYOffset;

        y = 50 + ( - (box.height() - $(window).height() )) * offset / max_offset;

    }

    box.css("top", `calc(${y}px + ${x}vh)`)
    box.css("z-index", box_i);
    return x;
}

var active_pos = function() {
    var page_y = window.pageYOffset

    for (var i=boxes.length - 1; i >= 0; i--) { 
        var min_box_pos = i * PAGE_PER_I - 1000;
        if (( 1 + Math.exp( - 1 * (page_y - min_box_pos))) < 1.01) {
            return i;
        }
    }
}

var onscroll = function (e) {
// called when the window is scrolled.
    for (var i=0; i <= boxes.length; i++) {
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
set_hamburger(hamburger_on);
