import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
    let loginButton = document.getElementById("button_login")

    loginButton.onclick = function () {
        login()
    }
}

function login() {
    const email = document.getElementById("input_email").value
    const password = document.getElementById("input_password").value

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem("access_token", user.uid);
            
            const urlParams = new URLSearchParams(window.location.search);
            const endpoint = urlParams.get("endpoint")

            if (endpoint != null) {
                location.href = endpoint
            } else {
                location.href = "/Gosei/index.html"
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode == "auth/wrong-password") {
                alert("Wrong password!")
            } else if (errorCode == "auth/user-not-found") {
                alert("Invalid credentials!")
            } else {
                alert(`[${errorCode}]: ${errorMessage}`)
            }
        });

}