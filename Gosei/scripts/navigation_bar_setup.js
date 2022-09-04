function setupNavigationBar() {
    let loginButton = document.getElementById("button_login")
    let cartButton = document.getElementById("button_cart")
    let logoutButton = document.getElementById("button_logout")

    const isLoggedIn = window.localStorage.getItem("access_token") != "null"

    if (isLoggedIn) {
        loginButton.remove()
        cartButton.style.display = "block"
        logoutButton.style.display = "block"

        logoutButton.onclick = function() {
            window.localStorage.setItem("access_token", null);

            if (window.location.href.includes("Cart.html")) {
                location.href = "/Gosei/index.html"
            } else {
                document.location.reload()
            }
        }
    } else {
        loginButton.style.display = "block"
        cartButton.remove()
        logoutButton.remove()
    }
}

setupNavigationBar()