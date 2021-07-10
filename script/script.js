$(document).ready(function (){
    $('.add-product').click(function () {
        $('form[name="form-for-product"]').slideUp(500);
        $('.div_add-product').fadeIn(500);
    })

    $('.btn-next-add').click(function (){
        $('form[name="form-for-product"]').slideDown(500);
        $('.div_add-product').fadeOut(500);
        $('.add-product').hide();
        $('.for-btn-description').hide();

        let count_products = $('.container_radio-btn input:checked').data('value');

        if(count_products == 1) {
            $('.add-product').show();
            $('.for-btn-description').show();
            $('.container_radio-btn input').prop('checked', false).eq(4).prop('checked', true);
        }
        generation(count_products - 1);
        set_price();
    })

    $('.btn-post-form').click(form_result);
    function form_result() {
        $('.circle').show();
        $('.price-product').empty();
        setTimeout(function (){
            if(check_form()) {
                let state = { 'status': 'success' };
                let title = 'success';
                let url = window.location + 'paymentsuccess';
                if(history.pushState){
                    history.pushState(state, title, url);
                }
                success_view();
            } else {
                let state = { 'status': 'error' };
                let title = 'error';
                let url = window.location + 'paymenterror';
                if(history.pushState){
                    history.pushState(state, title, url);
                }
                error_view();
            }
        }, 1500);
    }

})

var prices = {
    '1' : 24.99,
    '2' : 44,
    '3' : 60,
    '4' : 72,
    '5' : 80
};

function generation(count) {
    let result = '';
    for(let i = 0; i < count; i++) {
        result += "<div class=\"div_input div_product\">\n" +
            "       <div class='name_product'>" +
            "           <h3>Product "+ (i+2) +"</h3><span class='remove-product'></span>\n" +
            "       </div>" +
            "       <label>Enter main keyword for the product</label>\n" +
            "       <input type=\"text\" placeholder=\"for example, sylicon wine cup\">\n" +
            "       <label>Enter link to the similar product as a reference</label>\n" +
            "       <input type=\"text\" placeholder=\"https://...\">\n" +
            "</div>"
    }
    $('.overflow').append(result);
    set_click_on_remove();
}

function set_price() {
    let count_product = $('.div_product').length;
    $('.price-product').text('Submit and Pay '+ prices[count_product] +' USD');
}

function set_click_on_remove() {
    $('.remove-product').click(function (){
        $(this).parents('.div_product').fadeOut(300);
        let self = this;
        setTimeout(function () {
            $(self).parents('.div_product').remove();
            let count_product = $('.div_product').length;
            for(let i = 0; i < count_product; i++){
                $('.div_product h3').eq(i).text('Product ' + (i+1));
            }
            set_price();
            add_button();
        }, 300);

    })
}

function add_button() {
    let count_products = $('.div_product').length;
    if(count_products == 1) {
        $('.add-product').show();
        $('.for-btn-description').show();
        $('.container_radio-btn input').prop('checked', false).eq(4).prop('checked', true);
    }
}

function success_view() {
    $('.form-overflow').addClass('finish_form').html(
        `<div class="overflow">
            <div class="div_input">
                <h3>Successfull payment</h3>
                <p>Your request has been accepted and will be processed within 24 working hours. We will send you a payment details and all information to your email.</p>
                <div class="viev_result">
                    <img src="img/success.png" alt="">
                </div>
            </div>
        </div>`
    );
    $('.for-btn-submit').hide();
    $('.btn-post-form').html('Back').off('click');
}

function error_view() {
    $('.form-overflow').addClass('finish_form').html(
        `<div class="overflow">
            <div class="div_input">
                <h3>Your payment failed</h3>
                <p>Sorry, but we’ve having trouble processing your payment. You have been not charged for this transaction.</p>
                <div class="viev_result">
                    <img src="img/erroe.png" alt="error">
                </div>
            </div>
        </div>`
    );
    $('.for-btn-submit').hide();
    $('.btn-post-form').html('Try to pay again').css('background', '#EA717F').off('click');
}

function check_form() {
    let result = true;
    $('.overflow input').each(function () {
        if($(this).val() === "") {
            result = false;
        }
    });
    return result;
}
