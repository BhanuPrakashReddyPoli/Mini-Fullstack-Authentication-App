const BASE_URL = "http://localhost:8080/users";

async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ email, password }),
            credentials: "include" // ✅ Important!
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Invalid login credentials");
            return;
        }

        if (data.message !== "Login Successful!") {
            alert(data.message);
            return;
        }

        alert("Login successful!");
        localStorage.setItem("userEmail", email);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    }
}
