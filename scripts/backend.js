import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDNnT8RViztz2dZi3BOVwVv8rX38XuNYw4",
    authDomain: "goseiwebshop.firebaseapp.com",
    projectId: "goseiwebshop",
    storageBucket: "goseiwebshop.appspot.com",
    messagingSenderId: "646725937170",
    appId: "1:646725937170:web:99103f4bc691daf5bad0cb"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

  const database = getDatabase()
  const databaseRef = ref(database)

  get(child(databaseRef, "index_slider")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
      } else {
          alert("no data found")
      }
  })
  .catch((error) => {
      alert("get rekt" + error)
  })

  console.log(get)
