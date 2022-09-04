import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

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

    let signupButton = document.getElementById("button_signup")
    signupButton.onclick = signup
}

function signup() {
    const emailField = document.getElementById("field_email")
    const passwordField = document.getElementById("field_password")

    const email = emailField.value
    const password = passwordField.value

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem("access_token", user.uid);
            
            const urlParams = new URLSearchParams(window.location.search);
            const endpoint = urlParams.get("endpoint")

            const database = getFirestore()
            const productsRef = doc(collection(database, "user_carts"), user.uid)

            setDoc(productsRef, { products: []})
                .then(snapshot => {
                    location.href = "/Gosei/index.html"
                })
                .catch(error => {
                    alert("Error creating cart cart:\n" + error)
                })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if (errorCode == "auth/invalid-email") {
                alert("Please provide a valid email!")
            } else if (errorCode == "auth/email-already-in-use") {
                alert("An account was already made with provided email!")
            } else {
                alert(`[${errorCode}]: ${errorMessage}`)
            }
        });
}