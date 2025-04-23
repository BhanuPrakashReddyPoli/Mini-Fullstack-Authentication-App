const BASE_URL = "http://localhost:8080/users";

async function loginUser(event) {
    event.preventDefault(); // ✅ Prevent default form submit
    const email = document.getElementById("email").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Invalid login credentials");
            return;
        }

        alert("Login successful!");
        localStorage.setItem("userEmail", email);
        window.location.href = "dashboard.html"; // ✅ This should now work
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
}

// ✅ Attach event listener once DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", loginUser);
    }
});
