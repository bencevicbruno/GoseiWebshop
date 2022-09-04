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

function setupProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get("category") 

    const database = getFirestore()
    const collectionRef = collection(database, "products")

    function createSideButtonHTML(title, isActive) {
        return `
            <button style="" id="side_button_${title}"
                    type="button"
                    class="list-group-item list-group-item-action ${isActive ? "active" : ""}" ${isActive ? 'aria-current="true"' : ''}>
                ${title}
            </button>
        `
    }

    function createProductRow(productID, imageURL, title, description, price) {
        let shortDescription = ""

        if (description.length > 150) {
            shortDescription = description.substring(0, 150) + "..."
        } else {
            shortDescription = description
        }

        return ` 
            <a href="/Gosei/Product.html?productID=${productID}" class="product-page text-decoration-none">
                <div class="card mt-5 w-100 mb-5" style="margin: 0 auto; color: #000000;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imageURL}" class="img-fluid rounded-start" alt="#">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title mt-2">${title}</h5>
                                <p class="card-text mt-2">${shortDescription}</p>
                                <p class="card-text mt-2">Price: ${price}$</p>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            ` 
    }

    let categories = []
    let categoriesContent = []

    function changeContentTo(category) {
        const categoryContent = categoriesContent[categories.indexOf(category)]

        let productsContainer = document.getElementById("container_products")
        productsContainer.innerHTML = categoryContent

        categories.forEach(currentCategory => {
            const shouldBeActive = currentCategory == category
            let sideButton = document.getElementById("side_button_" + currentCategory)
            
            if (shouldBeActive) {
                sideButton.classList.add("active")
            } else {
                sideButton.classList.remove("active")
                //sideButton.attributes.removeNamedItem("aria-current=true")
            }
        })
    }

    getDocs(collectionRef)
        .then(snapshot => {
            let data = snapshot.docs.map(doc => {
                return doc.data()
            })

            if (category == null) {
                category = data[0].category
            }

            categories = Array.from(new Set(data.map(item => item.category)))
            categoriesContent = categories.map(item => "")
            
            let sideButtonsContainer = document.getElementById("container_side_buttons")

            for (let i = 0; i < categories.length; i++) {
                sideButtonsContainer.innerHTML += createSideButtonHTML(categories[i], categories[i] == category)
            }

            for (let i = 0; i < categories.length; i++) {
                let sideButton = document.getElementById("side_button_" + categories[i])
                
                sideButton.onclick = function() {
                    changeContentTo(categories[i])
                }
            }

            for (let i = 0; i < data.length; i++) {
                const product = data[i]
                const productHTML = createProductRow(product.id, product.imageURL, product.name, product.description, product.price)

                const categoryIndex = categories.indexOf(product.category)
                categoriesContent[categoryIndex] += productHTML
            }

            changeContentTo(category)
        })
        .catch(error => {
            alert("Error fetching promotional products data:\n" + error)
        })

}