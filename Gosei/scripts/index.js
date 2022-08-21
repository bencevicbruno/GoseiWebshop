const newsletterForm = document.querySelector('.newsletter-input');

newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();

    newsletterForm.value = '';
});