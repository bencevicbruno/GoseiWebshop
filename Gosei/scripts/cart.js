import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

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
            if (snapshot.data() != null) {
                fetchProducts(snapshot.data().products)

                if (snapshot.data().products.length > 0) {
                    let checkoutButton = document.getElementById("button_checkout")
                    checkoutButton.style.display = "block"

                    let checkoutLink = document.getElementById("link_checkout")
                    checkoutLink.href = "/Gosei/Checkout.html"
                }
            }
        })
        .catch(error => {
            alert("Error fetching cart:\n" + error)
        })
}

function createProductHTML(productData, amount) {
    return `
    <div id="product_${productData.id}" class="container cart-container d-flex align-items-center">
        <div class="container">
            <a href="/Gosei/Product.html?productID=${productData.id}" style="text-decoration: none; color: #000000;">
                <img class="product-image mx-3" src="${productData.imageURL}" width="180" height="210">
            </a>
        </div>
        <div class="product-elements container">
            <div class="product-title col-md-12 mt-2 mb-2">${productData.name}</div>
            <div class="product-price col-md-12 mt-2 mb-2">Price: ${productData.price}$</div>
            <div class="product-quantity col-md-12 mt-2 mb-2">Quantity: ${amount}</div>
        </div>
        <div class="remove-button-container container d-flex align-items-center justify-content-end">
        <button id="button_delete_${productData.id}" "type="button" class="remove-button btn-close" aria-label="Close"></button>
        </div>
    </div>
    <hr class="line-between-products">
    `
}

let products = []

function insertHTMLForProduct(products, productData, amount) {
    let productsContainer = document.getElementById("container_products")
    productsContainer.innerHTML += createProductHTML(productData, amount)
}

function setupDeleteButton(products, productData) {
    setTimeout(() => {
        let deleteButton = document.getElementById( `button_delete_${productData.id}`)
    
        deleteButton.onclick = function() {
            const accessToken = window.localStorage.getItem("access_token")

            const database = getFirestore()
            
            const newProducts = products.filter(product => product.productID != productData.id)
            const productsRef = doc(collection(database, "user_carts"), accessToken)

            updateDoc(productsRef, { products: newProducts })
                .then(snapshot => {
                    setupCart()
                })
                .catch(error => {
                    alert("Error removing item from cart:\n" + error)
                })
        }
    }, 500)
}

function fetchProducts(products) {
    let productsContainer = document.getElementById("container_products")
    productsContainer.innerHTML = ""

    let label = document.getElementById("label_cart_empty")
    label.style.display = (products.length == 0) ? "block" : "none"

    const checkoutButton = document.getElementById('button_checkout');
    checkoutButton.style.display = products.length == 0 ? 'none' : 'block'

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
                        insertHTMLForProduct(products, item, product.amount)
                    }
                })

                products.forEach(product => {
                    if ((item.id == product.productID) && (product.amount != 0)) {
                        setupDeleteButton(products, item)
                    }
                })
            })

            let total = 0
            data.forEach(item => {
                products.forEach(product => {
                    if (item.id == product.productID) {
                        total += parseInt(item.price) * parseInt(product.amount)
                    }
                })
            })

            let totalLabel = document.getElementById("label_total")
            totalLabel.innerHTML = "Your total is: <b>" + total + "$</b>"
        })
        .catch(error => {
            alert("Error fetching cart products data:\n" + error)
        })
}