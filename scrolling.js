var PAGE_PER_I = 1000;

var boxes = [
    '#content_about',
    '#content_projects',
    //'#content_set',
    //'#content_hopfield',
    //'#content_memo',
    //'#content_art',
    '#content_pubs',
    '#content_links',
];

var projects_start = boxes.indexOf('#content_projects');
var projects_end = boxes.indexOf('#content_pubs');


var projects = [
    'content_set',
    'content_hopfield',
    'content_memo',
    'content_art'
];

var box_links = {
    'content_projects':  projects
};

var project_icons = {
    'content_set': 'set_icon_box',
    'content_hopfield': 'hop_icon_box',
    'content_memo': 'memo_icon_box',
    'content_art': 'art_icon_box'
};

var permanent_sidebar = function() {
    return screen.width > 800;
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
            $('#'+projects[i]).css('z-index', 1.1);
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
    var diff = Math.abs(active_pos() - box_i);
    $('body').scrollTo((box_i) * PAGE_PER_I - 200, {duration: 600 * Math.sqrt(diff)});
}

var set_box_pos = function(box_i, box) {
    var page_y = window.pageYOffset;
    var min_box_pos = box_i * PAGE_PER_I - 1000;

    var box_id = box.attr('id');
    if (box_id in box_links) {
        links = box_links[box_id];
        for (var i=0; i < links.length; i++) {
            var x = 2000  - 1885  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
            $('#' + links[i]).css('margin-top', x + 'px');
        }
    }
    var x = 2000  - 1955  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));

    box.css("margin-top", x + "px");
    box.css("z-index", box_i);
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
