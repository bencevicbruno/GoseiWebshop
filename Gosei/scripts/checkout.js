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
    checkoutButton.onclick = function() {
        if (checkFields()) {
            location.href = "/Gosei/Payment.html"
        } else {
            alert("Please fill out the checkout form!")
        }
    }
}

function isNonEmpty(element) {
    return element.value != null && element.value != ""
}

function checkFields() {
    const requiredElements = ["email", "first-name", "last-name", "address", "city", "zipcode", "country", "phone"]

    return requiredElements
        .map(id => document.getElementById(id))
        .map(element => isNonEmpty(element))
        .every(item => item == true)
}