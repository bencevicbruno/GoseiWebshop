import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDNnT8RViztz2dZi3BOVwVv8rX38XuNYw4",
    authDomain: "goseiwebshop.firebaseapp.com",
    projectId: "goseiwebshop",
    storageBucket: "goseiwebshop.appspot.com",
    messagingSenderId: "646725937170",
    appId: "1:646725937170:web:99103f4bc691daf5bad0cb"
  };

// Karlov dio za nesta
const newsletterForm = document.querySelector('.newsletter-input');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    newsletterForm.value = '';
});

function setupCarousel() {
    const database = getFirestore()
    const collectionRef = collection(database, "index_slider")

    function createCarouselItemHTML(isActive, imageSource, title, description) {
        return `
        <div class="carousel-item ${isActive ? "active" : ""}">
          <img src="${imageSource}" class="d-block w-100 carousel-img">
          <div class="carousel-caption d-none d-md-block">
            <h5>${title}</h5>
            <p>${description}</p>
          </div>
        </div>`
    }

    function createCarouselButtonHTML(isActive, index, nextIndex) {
        return `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${nextIndex}" ${isActive ? 'aria-current="true"' : ''} ${isActive ? 'class="active"' : ''}
        aria-label="Slide ${index}"></button>`
    }

    getDocs(collectionRef)
    .then(snapshot => {
        let data = snapshot.docs.map(doc => {
            return doc.data()
        })

        let carouselItemsContainer = document.getElementById("container_carousel_items")

        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            const itemHTML = createCarouselItemHTML(i == 0, item.image_url, item.title, item.description)
            carouselItemsContainer.innerHTML += itemHTML
        }

        let carouselButtonsContainer = document.getElementById("carousel-indicators-container")

        for (let i = 0; i < data.length; i++) {
            carouselButtonsContainer.innerHTML += createCarouselButtonHTML(i == 0, i, (i + 1) % data.length)
        }

        
    })
    .catch(error => {
        alert("Error fetching carousel data:\n" + error)
    })
}

function setupPromotionalProducts() {
    const database = getFirestore()
    const collectionRef = collection(database, "products")

    function createProductHTML(imageURL, title, description, price) {
        const imageURLplaceholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/440px-Grosser_Panda.JPG"
        return `
        <div class="card mx-2" style="width: 18rem;">
        <img class="card-img-top" src="${imageURLplaceholder}" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <a href="/Gosei/Product.html" class="btn btn-outline-success d-flex justify-content-center">${price} $</a>
        </div>
      </div>`
    }

    getDocs(collectionRef)
    .then(snapshot => {
        let data = snapshot.docs.map(doc => {
            return doc.data()
        })

        console.log(data)
        let productItemsContainer = document.getElementById("product_items_container")

        for (let i = 0; i < 5; i++) {
            let item = data[Math.floor(Math.random()*data.length)];
            productItemsContainer.innerHTML += createProductHTML("", item.name, item.subtitle, item.price)
        }

        data.forEach(item => {
            
        })

        // for (let i = 0; i < data.length; i++) {
        //     let item = data[i]
        //     const itemHTML = createCarouselItemHTML(i == 0, item.image_url, item.title, item.description)
        //     carouselItemsContainer.innerHTML += itemHTML
        // }

        // let carouselButtonsContainer = document.getElementById("carousel-indicators-container")

        // for (let i = 0; i < data.length; i++) {
        //     carouselButtonsContainer.innerHTML += createCarouselButtonHTML(i == 0, i, (i + 1) % data.length)
        // }

        
    })
    .catch(error => {
        alert("Error fetching promotional products data:\n" + error)
    })
}

window.onload = function () {
    initializeApp(firebaseConfig);
    setupCarousel()
    setupPromotionalProducts()
}