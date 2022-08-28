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

// Karlov dio za nesta
const newsletterForm = document.querySelector('.newsletter-input');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    newsletterForm.value = '';
});

window.onload = function () {
    initializeApp(firebaseConfig);
    const database = getFirestore()
    const collectionRef = collection(database, "index_slider")

    function createCarouselItemHTML(isActive, imageSource, title, description) {
        return `
        <div class="carousel-item ${isActive ? "active" : ""}">
          <img src="${imageSource}" class="d-block w-100 carousel-img">
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
        alert(error)
    })

    // collection("index_slider")
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // });
    // get(child(databaseRef, "index_slider")).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val())
    //     } else {
    //         alert("no data found")
    //     }
    // })
    // .catch((error) => {
    //     alert(error)
    // })

    // Get a database reference to our posts
    
    //const reference = database.ref('index_slider');

    // Attach an asynchronous callback to read the data at our posts reference
    // reference.on('value', (snapshot) => {
    //     console.log(snapshot.val());
    // }, (errorObject) => {
    //     console.log('The read failed: ' + errorObject.name);
    // });

    // listAll(listRef)
    //     .then((res) => {
    //         const imagePaths = res.items.map(item => item._location.path)
    //         let didSetFirstImageActive = false

    //         imagePaths.forEach(path => {
    //             getDownloadURL(ref(storage, path))
    //                 .then(url => {
                        // let carouselItemsContainer = document.getElementById("container_carousel_items")
                        // carouselItemsContainer.innerHTML = carouselItemsContainer.innerHTML + createCarouselItemHTML(url, !didSetFirstImageActive)
                        // didSetFirstImageActive = true
                        // console.log(createCarouselItemHTML(url))
    //                 })
    //         })
    //     })
}