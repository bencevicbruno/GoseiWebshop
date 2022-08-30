const emptyCartMessage = document.querySelector('.empty-cart');
emptyCartMessage.style.display = 'none';

//product container
const product = document.querySelector('.cart-container');

//line between products
const line = document.querySelector('.line-between-products');

//checkout button
const checkout = document.querySelector('.product-checkout');

const removeProductButton = document.querySelector('.remove-button');

removeProductButton.addEventListener('click', function(e){
    e.preventDefault();

    product.remove();
    line.remove();
    checkout.remove();

    emptyCartMessage.style.display = '';
});