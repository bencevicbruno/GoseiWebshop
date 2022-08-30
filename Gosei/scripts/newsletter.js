const newsletterForm = document.querySelector('.newsletter-form');

//successful newsletter message
const newsletterMessage = document.querySelector('.newsletter-message-success');
newsletterMessage.style.display = 'none';

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    newsletterForm.remove();
    newsletterMessage.style.display = '';
});