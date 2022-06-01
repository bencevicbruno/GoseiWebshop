import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

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
const database = getFirestore(app)

function addUser(firstName, lastName, age) {
    let user = {
        first: firstName,
        last: lastName,
        age: age
    }

    try {
        addDoc(collection(database, "users"), user)
    } catch (error) {
        console.log("Error adding user: ", error, " with data ", user)
    }
}

//addUser("Michael", "Jackson", 52)

function addUserFromFields(e) {
    e.preventDefault();
    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let age = document.getElementById("aAge").value
    addUser(firstName, lastName, age)
    fetchUsers(users => {
        users.forEach(user => addUserToList(user))
    })
}
/*
try {
    const docRef = await addDoc(collection(database, "users"), {
        first: "Karlo",
        last: "Adzic",
        age: 69
    });
} catch(error) {
    console.log("Error adding document_: ", error);
}
*/

let fetchUsers = function(completion) {
    getDocs(collection(database, "users"))
    .then((snapshot) => {
        let users = []
    
        snapshot.docs.forEach((doc) => {
            users.push({...doc.data(), id: doc.id})
        })
        completion(users)
    })
    .catch(error => {
        console.log(error.message)
    })
}

let addUserToList = function(user) {
    var usersList = document.getElementById("users_list")
    var li = document.createElement("li")
    li.appendChild(document.createTextNode(user.first))
    li.setAttribute("id", "" + user.id)
    usersList.appendChild(li)
}

fetchUsers(users => {
    users.forEach(user => addUserToList(user))
})

/*
const querySnapshot = await getDocs(collection(database, "users"));

const docRef = doc(database, "users", "0RGgU90rdjnVbvCMzEQV");
const docSnap = await getDoc(docRef);
console.log(docSnap)
 */


document.getElementById('submitButton').onclick = addUserFromFields;