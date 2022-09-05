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

function setupCarousel() {
    const database = getFirestore()
    const collectionRef = collection(database, "index_slider")

    function createCarouselItemHTML(isActive, imageSource, title, description) {
        return `
        <div class="carousel-item ${isActive ? "active" : ""}">
          <img src="${imageSource}" class="d-block w-100 carousel-img" style="aspect-ratio: 2">
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

    function createProductHTML(imageURL, title, description, price, productID) {
        const imageURLplaceholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/440px-Grosser_Panda.JPG"
        return `
        <a href="/Gosei/Product.html?productID=${productID}" style="text-decoration: none; color: #000000;">
            <div class="card mx-2" style="width: 18rem;">
                <img class="card-img-top p-2" src="${imageURL}" alt="${title}" width="300" height="250">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title mt-1 mb-1">${title}</h5>
                    <p class="card-text mt-1 mb-1">${description}</p>
                    <a href="/Gosei/Product.html?productID=${productID}" class="btn btn-outline-success d-flex justify-content-center mt-auto">${price} $</a>
                </div>
            </div>
        </a>`
    }

    function createCategoryHTML(title, imageURL) {
        return `
        <a href="/Gosei/Products.html?category=${title}" style="text-decoration: none; color: #000000;">
        <div class="card mx-2" style="width: 18rem;">
            <img class="card-img-top p-2" src="${imageURL}" alt="Card image cap" width="300" height="250">
            <div class="card-body">
                <a href="/Gosei/Products.html?category=${title}" class="btn btn-outline-success d-flex justify-content-center">${title}</a>
            </div>
        </div>
        </a>`
    }

    getDocs(collectionRef)
        .then(snapshot => {
            let data = snapshot.docs.map(doc => {
                return doc.data()
            })

            let productItemsContainer = document.getElementById("product_items_container")

            for (let i = 0; i < 5; i++) {
                let item = data[Math.floor(Math.random() * data.length)];
                productItemsContainer.innerHTML += createProductHTML(item.imageURL, item.name, item.subtitle, item.price, item.id)
            }

            const categories = new Array()
            const categoryImages = []

            data.forEach(item => {
                const category = item.category

                if (!categories.includes(category)) {
                    categories.push(category)
                    categoryImages.push(item.imageURL)
                }
            })

            let categoriesContainer = document.getElementById("container_categories")

            for (let i = 0; i < categories.length; i++) {
                categoriesContainer.innerHTML += createCategoryHTML(categories[i], categoryImages[i])
            }
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