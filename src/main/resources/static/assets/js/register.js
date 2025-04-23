const BASE_URL = "http://localhost:8080/users";

async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message);
            return;
        }
        
        alert(data.message);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) registerForm.addEventListener("submit", registerUser);
});