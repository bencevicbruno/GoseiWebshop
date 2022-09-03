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

// Firebase implementation

window.onload = function () {
    initializeApp(firebaseConfig);
    setupProducts()
}

function sideButtonTapped(category) {
    console.log(category)
}

function setupProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get("category") 

    const database = getFirestore()
    const collectionRef = collection(database, "products")

    function createSideButtonHTML(title, isActive) {
        return `
            <button type="button" value="${title}" onclick="sideButtonTapped(this.value)" class="list-group-item list-group-item-action ${isActive ? "active" : ""}" ${isActive ? 'aria-current="true"' : ''}>${title}</button>
        `
    }

    getDocs(collectionRef)
        .then(snapshot => {
            let data = snapshot.docs.map(doc => {
                return doc.data()
            })

            if (category == null) {
                category = data[0].category
            }

            const categories = Array.from(new Set(data.map(item => item.category)))
            let sideButtonsContainer = document.getElementById("container_side_buttons")

            for (let i = 0; i < categories.length; i++) {
                console.log(i)
                sideButtonsContainer.innerHTML += createSideButtonHTML(categories[i], categories[i] == category)
            }

            console.log(category)
            console.log(data)
        })
        .catch(error => {
            alert("Error fetching promotional products data:\n" + error)
        })

}