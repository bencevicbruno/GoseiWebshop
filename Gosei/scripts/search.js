const searchBarForm = document.querySelector('.search-bar-form');
const searchBarInput = document.querySelector('.search-bar-input');

searchBarForm.addEventListener('input', function(e){
    e.preventDefault(); 
});

searchBarForm.addEventListener('submit', function(e){
    e.preventDefault();
    searchBarInput.value = '';
});