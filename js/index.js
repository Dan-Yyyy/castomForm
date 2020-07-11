$( document ).ready(function() {
   $('.show_from').click(function(){
   		$('.popup-container').addClass('show');
   		$('#contact-form').fadeIn(250);
   });

   $('.contact-form_cancel').click(function() {
   		$('#contact-form').fadeOut(250);
		$('#thanks_order_form').fadeOut(250)
		$('.popup-container').removeClass('show');
   });

   $('.finish_form').click(function() {
   		$('#contact-form').hide();
		$('#thanks_order_form').fadeIn(250);
		setTimeout(function() {
			$('#thanks_order_form').fadeOut(250);
			$('.popup-container').removeClass('show');
		}, 1500);
   });
});