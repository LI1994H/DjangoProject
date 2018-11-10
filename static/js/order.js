$(function () {
    $('.goodsinfo').each(function () {
        var price = $(this).find('.price').text();
        var number = $(this).find('.number').text();
        $(this).find('.total').html((price * number).toFixed(2))
    });
    var total = 0;
    $('.total').each(function () {
        total += parseFloat($(this).text());
    });
    $('.cartToal b').html(total.toFixed(2))
});