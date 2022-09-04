import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDNnT8RViztz2dZi3BOVwVv8rX38XuNYw4",
    authDomain: "goseiwebshop.firebaseapp.com",
    projectId: "goseiwebshop",
    storageBucket: "goseiwebshop.appspot.com",
    messagingSenderId: "646725937170",
    appId: "1:646725937170:web:99103f4bc691daf5bad0cb"
};

// Firebase implementation

window.onload = function () {
    initializeApp(firebaseConfig);
    setupCart()
}

function setupCart() {
    const accessToken = window.localStorage.getItem("access_token")

    const database = getFirestore()
    const docRef = doc(database, "user_carts", accessToken);

    getDoc(docRef)
        .then(snapshot => {
            fetchProducts(snapshot.data().products)
        })
        .catch(error => {
            alert("Error fetching cart:\n" + error)
        })
}

function createProductHTML(productData, amount) {
    return `
    <div id="${productData.id}" class="container cart-container d-flex align-items-center">
        <div class="container">
            <img class="product-image mx-3" src="${productData.imageURL}" width="180" height="210">
        </div>
        <div class="product-elements container">
            <div class="product-title col-md-12 mt-2 mb-2">${productData.name}</div>
            <div class="product-price col-md-12 mt-2 mb-2">Price: ${productData.price}$</div>
            <div class="product-quantity col-md-12 mt-2 mb-2">Quantity: ${amount}</div>
        </div>
        <div class="remove-button-container container d-flex align-items-center justify-content-end">
        <button type="button" class="remove-button btn-close" aria-label="Close"></button>
        </div>
    </div>
    <hr class="line-between-products">
    `
}

let products = []

function insertHTMLForProduct(productData, amount) {
    let productsContainer = document.getElementById("container_products")
    productsContainer.innerHTML += createProductHTML(productData, amount)
}

function fetchProducts(products) {
    let label = document.getElementById("label_cart_empty")
    label.style.display = (products.length == 0) ? "block" : "none"

    const database = getFirestore()
    const collectionRef = collection(database, "products")

    getDocs(collectionRef)
        .then(snapshot => {
            let data = snapshot.docs.map(doc => {
                return doc.data()
            })

            data.forEach(item => {
                products.forEach(product => {
                    if ((item.id == product.productID) && (product.amount != 0)) {
                        insertHTMLForProduct(item, product.amount)
                    }
                })
            })

            console.log(data)
        })
        .catch(error => {
            alert("Error fetching promotional products data:\n" + error)
        })
}