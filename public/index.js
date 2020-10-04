
// Menu shopping list
$(".fa-tasks").click(function(e) {
    e.stopPropagation();
    var display =  $(".shopping-list-dropdown").css("display");
    if(display != "none") {
        $(".shopping-list-dropdown").hide();
    } else {
        $(".shopping-list-dropdown").show();
    }
});

$(document).click(function() {
    var display =  $(".shopping-list-dropdown").css("display");
    if(display != "none") {
        $(".shopping-list-dropdown").hide();
    }
});

