

// $('.like-btn').on('click', function() {
//     $(this).toggleClass("blue");
//  });

 $('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    var price = $('.price');

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }
 
  $input.val(value);
 
});
 
$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    if(value>10){
        window.prompt('max limit is 10');
        return;
    }
 
    if (value < 10) {
        value = value + 1;
    } 
 
    $input.val(value);
});



