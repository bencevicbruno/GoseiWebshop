import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDNnT8RViztz2dZi3BOVwVv8rX38XuNYw4",
    authDomain: "goseiwebshop.firebaseapp.com",
    projectId: "goseiwebshop",
    storageBucket: "goseiwebshop.appspot.com",
    messagingSenderId: "646725937170",
    appId: "1:646725937170:web:99103f4bc691daf5bad0cb"
};

window.onload = function () {
    initializeApp(firebaseConfig);

    let checkoutButton = document.getElementById("button_checkout")
    checkoutButton.onclick = checkout
}

function isFormValid() {

}

function checkout() {
    const accessToken = window.localStorage.getItem("access_token")
    if (accessToken == null) return

    const database = getFirestore()

    const cartRef = doc(collection(database, "user_carts"), accessToken)

    setDoc(cartRef, { products: [] })
        .then(() => {
            alert("Checkout successful.")
            location.href = "/Gosei/Index.html"
        })
        .catch(error => {
            alert("Error adding item to cart:\n" + error)
        })

}