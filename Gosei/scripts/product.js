//import { setup } from "@grpc/grpc-js/build/src/channelz";
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

//product pictures
/* potrebno mijenjati slike na klik? */
const main = document.querySelector('.main-picture');
const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

shippingDiv.style.display = 'none';
paymentDiv.style.display = 'none';

descriptionButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.add('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = '';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = 'none';
})

shippingButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.add('active');
    paymentButton.classList.remove('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = '';
    paymentDiv.style.display = 'none';
})

paymentButton.addEventListener('click', function(e){
    e.preventDefault();

    descriptionButton.classList.remove('active');
    shippingButton.classList.remove('active');
    paymentButton.classList.add('active');

    descriptionDiv.style.display = 'none';
    shippingDiv.style.display = 'none';
    paymentDiv.style.display = '';
})

inputValue.addEventListener('change', function(e){
    if(inputValue.value < 1){
        alert('Please choose correct quantity number!');
        inputValue.value = 1;
    }
})

increment.addEventListener('click', function(e){
    e.preventDefault();
    inputValue.value++;
})

decrement.addEventListener('click', function(e){
    e.preventDefault();
    
    if(inputValue.value > 1){
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
}

function setupProductInfo() {
    const database = getFirestore()
    const collectionRef = collection(database, "products")

    const urlParams = new URLSearchParams(window.location.search);
    const productID = urlParams.get("productID")

    function createTableRowHTML(key, value) {
        return  `<tr>
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
        console.log(itemData)

        document.getElementById("product_name").innerHTML = itemData.name
        document.getElementById("product_subtitle").innerHTML = itemData.subtitle
        document.getElementById("product_price").innerHTML = itemData.price + "$"
        document.getElementById("product_description").innerHTML = itemData.desc

        let specsTable = document.getElementById("product_specs")
        Object.keys(itemData.specs).forEach(key => {
            specsTable.innerHTML += createTableRowHTML(key, itemData.specs[key])
        })
    })
    .catch(error => {
        alert("Error fetching carousel data:\n" + error)
    })
}