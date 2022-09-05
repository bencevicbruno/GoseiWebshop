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

    let addCardAndPayButton = document.getElementById("button_add_card_and_pay")
    addCardAndPayButton.onclick = function () {
        if (checkFields()) {
            checkout()
        } else {
            alert("Please insert card details")
        }
    }

    let payAtArrivalButton = document.getElementById("button_pay_at_arival")
    payAtArrivalButton.onclick = checkout

    setupTotal()
}

function isNonEmpty(element) {
    return element.value != null && element.value != ""
}

function checkFields() {
    const requiredElements = ["card-number", "expiration-date", "cvv"]

    return requiredElements
        .map(id => document.getElementById(id))
        .map(element => isNonEmpty(element))
        .every(item => item == true)
}

function checkout() {
    const accessToken = window.localStorage.getItem("access_token")
    if (accessToken == null) return

    const database = getFirestore()

    const cartRef = doc(collection(database, "user_carts"), accessToken)

    setDoc(cartRef, { products: [] })
        .then(() => {
            alert('Thank you for your order!')
            location.href = "/Gosei/Index.html"
        })
        .catch(error => {
            alert("Error adding item to cart:\n" + error)
        })

}

function setupTotal() {
    const accessToken = window.localStorage.getItem("access_token")

    const database = getFirestore()
    const docRef = doc(database, "user_carts", accessToken);

    getDoc(docRef)
        .then(snapshot => {
            if (snapshot.data() != null) {
                const products = snapshot.data().products
                const collectionRef = collection(database, "products")

                getDocs(collectionRef)
                    .then(snapshot => {
                        let data = snapshot.docs.map(doc => doc.data())

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
        })
        .catch(error => {
            alert("Error fetching cart:\n" + error)
        })
}