
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

// do not hide list when clicking in it
$(".shopping-list-dropdown").click(function(e) {
    e.stopPropagation();
});

// hide list when clicking outside list
$(document).click(function() {
    var display =  $(".shopping-list-dropdown").css("display");
    if(display != "none") {
        $(".shopping-list-dropdown").hide();
    }
});

// PAGE POPULATION
var prodList = queriedInfo;
var prodListLen = prodList.length;
var displayProducts = "";

// populate page with half price special products
var index = 0;
for(var i = 0; i < prodListLen; i++) {

    var opDiv = '<div class="product-item"' + ' id=' + index + '>';
    var img = '<img src=' + prodList[i].image + '>';
    var prodName = '<p class="product-name">' + prodList[i].name + '</p>';
    var prodPrice = '<p class="product-price">$' + prodList[i].price.toFixed(2) + '</p></div>';
    displayProducts += opDiv + img + prodName + prodPrice;

    index++;
}

$(".product-list").html(displayProducts);

// // add or remove items in shopping list
var shoppingList = [];
$('.product-item').click(function(){
    $(this).toggleClass('selected');
    var position = $(this).attr('id');

    // var selectedClassList = $(this).classList;
    var selectedClassList = $(this).attr('class').split(/\s+/);

    if (selectedClassList.includes('selected')) {
        shoppingList.push(position);
    } else {
        var removeIndex = shoppingList.indexOf(position);
        shoppingList.splice(removeIndex);
    }

    console.log(shoppingList);

    manageShopping(shoppingList);

});

// adding selected items to list
function manageShopping(list) {
    var shoppingListLen = list.length;
    var shoppingListHtml = "";

    var shoppingListTotal = 0;
    for (var listItem = 0; listItem < shoppingListLen; listItem++) {

        var listOp = '<div class="shopping-list-item"><p class="list-item-name">' + prodList[list[listItem]].name + '</p>';
        var listButtons = '<div class="list-functions"><div class="qty-change">';
        var listMinus = '<div class="trial-box"><i class="fas fa-minus fa-xs"></i></div>';
        var listInput = '<div class="trial-box">1</div>';
        var listPlus = '<div class="trial-box"><i class="fas fa-plus fa-xs"></i></div></div>';
        var listTrash = '<span class="remove">Remove</span></div></div>';

        shoppingListHtml += listOp + listButtons + listMinus + listInput + listPlus + listTrash;
        shoppingListTotal += prodList[list[listItem]].price;

    }

    shoppingListTotal = shoppingListTotal.toFixed(2);


    $(".list").html(shoppingListHtml);
    $(".total-cost").text("Total Cost: $" + shoppingListTotal);

}

// coppy list 
$('.copy').click(function(e) {
    e.stopPropagation();
    var copyText = $('.list p');
    var priceFigure = document.querySelector(".total-cost")
    var format = "";
    var copyTextLen = copyText.length;

    for (var text = 0; text < copyTextLen; text++) {
        format += "o " + copyText[text].innerText + "\n";
    }

    format += "\n" + priceFigure.innerText;

    navigator.clipboard.writeText(format).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
    });
});