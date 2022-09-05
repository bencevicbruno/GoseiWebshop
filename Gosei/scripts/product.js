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

//increment button
const increment = document.querySelector('.increment');

//decrement button
const decrement = document.querySelector('.decrement');

//input value
const inputValue = document.querySelector('.form-control');

//description div and button
const descriptionButton = document.querySelector('.btn-description');
const descriptionDiv = document.querySelector('.description');

//shipping div and button
const shippingButton = document.querySelector('.btn-shipping');
const shippingDiv = document.querySelector('.shipping-info');

//payment div and button
const paymentButton = document.querySelector('.btn-payment');
const paymentDiv = document.querySelector('.payment-options');

shippingDiv.style.display = 'none';
paymentDiv.style.display = 'none';

descriptionButton.addEventListener('click', function (e) {
    e.preventDefault();

    descriptionButton.classList.add('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = '';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = 'none';
})

shippingButton.addEventListener('click', function (e) {
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.add('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = '';
    paymentDiv.style.display = 'none';
})

paymentButton.addEventListener('click', function (e) {
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.add('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = '';
})

inputValue.addEventListener('change', function (e) {
    if (inputValue.value < 1) {
        alert('Please choose correct quantity number!');
        inputValue.value = 1;
    }
})

increment.addEventListener('click', function (e) {
    e.preventDefault();
    inputValue.value++;
})

decrement.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputValue.value > 1) {
        inputValue.value--;
    }
    else {
        alert('Please choose correct quantity number!')
    }
})

// Firebase implementation

window.onload = function () {
    initializeApp(firebaseConfig);
    setupProductInfo()
    setupAddToCart()
}

function setupProductInfo() {
    const database = getFirestore()
    const collectionRef = collection(database, "products")

    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("productID")

    let loginLink = document.getElementById("link_login")
    if (loginLink != null)
        loginLink.href = "Login.html?endpoint=Product.html?productID=" + productID.toString()

    function createTableRowHTML(key, value) {
        return `<tr>
        <td>${key}</td>
        <td>${value}</td>
      </tr>`
    }

    if (productID == null) return

    getDocs(collectionRef)
        .then(snapshot => {
            let data = snapshot.docs.map(doc => {
                return doc.data()
            })

            console.log()
            let itemData = null
            data.forEach(item => {
                if (item.id == productID) {
                    itemData = item
                    return
                }
            })

            if (itemData == null) return

            document.getElementById("product_name").innerHTML = itemData.name
            document.getElementById("product_image").src = itemData.imageURL
            document.getElementById("product_subtitle").innerHTML = itemData.subtitle
            document.getElementById("product_price").innerHTML = itemData.price + "$"
            document.getElementById("product_description").innerHTML = itemData.description

            let specsTable = document.getElementById("product_specs")
            Object.keys(itemData.specs).forEach(key => {
                specsTable.innerHTML += createTableRowHTML(key, itemData.specs[key])
            })
        })
        .catch(error => {
            alert("Error fetching carousel data:\n" + error)
        })
}

function setupAddToCart() {
    const accessToken = window.localStorage.getItem("access_token")

    let cartButton = document.getElementById("button_add_to_cart")
    let label = document.getElementById("label_login_to_buy")
    let container = document.getElementById("container_buttons")
    label.style.display = accessToken == "null" ? "block" : "none"

    if (accessToken == "null") {
        cartButton.style.display = "none"
        container.style.display = "none"
    } else {
        cartButton.onclick = function () {
            addToCart()
        }
    }
}

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productID = parseInt(urlParams.get("productID"))
    if (productID == null) return

    const accessToken = window.localStorage.getItem("access_token")
    if (accessToken == null) return

    let amountField = document.getElementById("field_amount")
    let amount = parseInt(amountField.value)

    const database = getFirestore()
    const productsRef = doc(database, "user_carts", accessToken)

    getDoc(productsRef)
        .then(snapshot => {
            let data = snapshot.data()

            let didUpdateValue = false
            for (let i = 0; i < data.products.length; i++) {
                if (parseInt(data.products[i].productID) == productID) {
                    data.products[i].amount = parseInt(data.products[i].amount) + amount
                    didUpdateValue = true
                    break
                }
            }

            if (!didUpdateValue) {
                data.products.push({
                    productID: productID,
                    amount: amount
                })
            }
            const cartRef = doc(collection(database, "user_carts"), accessToken)

            setDoc(cartRef, data)
                .then(() => {
                    alert("Successfully added item to cart!")
                })
                .catch(error => {
                    alert("Error adding item to cart:\n" + error)
                })
        })
        .catch(error => {
            alert("Error fetching cart products data:\n" + error)
        })
}