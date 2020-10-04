
var prodList = products;
var prodListLen = prodList.length;
var displayProducts = "";

// populate page with half price special products
var index = 0;
for(var i = 0; i < prodListLen; i++) {
    
    var opDiv = '<div class="product"' + ' id=' + index + '>';
    var img = '<img class="prod-img" src=' + prodList[i].image + '>';
    var p = '<p>' + prodList[i].name + '</p>';
    var h4 = '<h4 class=price>$' + prodList[i].price.toFixed(2) + '</h4></div>';
    displayProducts += opDiv + img + p + h4;

    index++;
}

$(".products").html(displayProducts);

// add or remove items in shopping list
var shoppingList = [];
$('.product').click(function(){
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


function manageShopping(list) {
    var shoppingListLen = list.length;
    var shoppingListHtml = "";

    var shoppingListTotal = 0;
    for (var listItem = 0; listItem < shoppingListLen; listItem++) {

        var listOp = '<li><p>' + prodList[list[listItem]].name + '</p></li>';
        shoppingListHtml += listOp;
        shoppingListTotal += prodList[list[listItem]].price;
    }

    shoppingListTotal = shoppingListTotal.toFixed(2);


    $(".shopping-list").html(shoppingListHtml);
    $(".total-cost").text("Total Cost: $" + shoppingListTotal);

}

$('.copy').click(function() {
    var copyText = $('.shopping-list li p');
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
})
