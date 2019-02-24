var PAGE_PER_I = 600;

var boxes = {
    1: '#content_projects',
    2: '#content_pubs',
    3: '#content_contact',
    4: '#content_links',
};

var scroll_to = function(box_i) {
    $('body').scrollTo((box_i+1.2) * PAGE_PER_I + 10, {duration: 1000});
}

var set_box_pos = function(box_i, box, page_y) {
    var min_box_pos = box_i * PAGE_PER_I + 100;

    var x = 500  - 499  / ( 1 + Math.exp( - .01 * (page_y - min_box_pos)));
    console.log(box.id, "x", x);
    box.css("margin-top", x + "vh");
    return x;
}

var onscroll = function (e) {  
// called when the window is scrolled.  
    var y = window.pageYOffset;
    console.log(e);
    $( "#counter").html(y);

    set_box_pos(0, $( "#content_about"), 10000);
    //set_box_pos(0, $( "#content_about" ), e.pageY);
    set_box_pos(1, $( "#content_projects" ), y);
    set_box_pos(2, $( "#content_pubs" ), y);
    set_box_pos(3, $( "#content_contact" ), y);
    set_box_pos(4, $( "#content_links" ), y);
} 

$('html').on('mousewheel', onscroll)
$('html').on('DOMMouseScroll', onscroll)
window.onscroll = onscroll;

scroll_to(0);
