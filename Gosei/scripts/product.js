//increment button
const increment = document.querySelector('.increment');

//decrement button
const decrement = document.querySelector('.decrement');

//input value
const inputValue = document.querySelector('.form-control');

//description div and button
const descriptionButton = document.querySelector('.btn-description');
const descriptionDiv = document.querySelector('.description');

//shipping div and button
const shippingButton = document.querySelector('.btn-shipping');
const shippingDiv = document.querySelector('.shipping-info');

//payment div and button
const paymentButton = document.querySelector('.btn-payment');
const paymentDiv = document.querySelector('.payment-options');

//product pictures
/* potrebno mijenjati slike na klik? */
const main = document.querySelector('.main-picture');
const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

shippingDiv.style.display = 'none';
paymentDiv.style.display = 'none';

descriptionButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.add('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = '';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = 'none';
})

shippingButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.add('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = '';
    paymentDiv.style.display = 'none';
})

paymentButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.add('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = '';
})

inputValue.addEventListener('change', function(e){
    if(inputValue.value < 1){
        alert('Please choose correct quantity number!');
        inputValue.value = 1;
    }
})

increment.addEventListener('click', function(e){
    e.preventDefault();
    inputValue.value++;
})

decrement.addEventListener('click', function(e){
    e.preventDefault();
    
    if(inputValue.value > 1){
        inputValue.value--;
    }
    else {
        alert('Please choose correct quantity number!')
    }
})