function logout() {
    fetch("http://localhost:8080/users/logout", {
        method: "POST",
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        localStorage.clear();
        document.cookie = "";
        window.location.href = "login.html";
    });
}