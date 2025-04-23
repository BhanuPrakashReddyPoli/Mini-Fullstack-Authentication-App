window.onload = async function () {
    try {
        const response = await fetch("http://localhost:8080/users/isLoggedIn", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Session expired. Please log in again.");
        }

        const data = await response.json();

        const welcomeMessage = document.getElementById("welcome-message");
        if (welcomeMessage) {
            welcomeMessage.innerText = `Welcome, ${data.email}`;
        } else {
            console.warn("Element with ID 'welcome-message' not found.");
        }

        await loadUserData(data.email);
    } catch (error) {
        alert(error.message);
        clearSessionAndRedirect();
    }
};

async function loadUserData(email) {
    try {
        const response = await fetch(`http://localhost:8080/users/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Failed to load user data.");
        }

        const userData = await response.json();

        const infoSection = document.querySelector(".employee-info");
        if (infoSection) {
            const nameEl = infoSection.querySelector("h2");
            const emailEl = infoSection.querySelector("p:nth-child(2)");
            const positionEl = infoSection.querySelector("p:nth-child(3)");
            const departmentEl = infoSection.querySelector("p:nth-child(4)");

            if (nameEl) nameEl.textContent = `Welcome, ${userData.name}`;
            if (emailEl) emailEl.textContent = `Email: ${userData.email}`;
            if (positionEl) positionEl.textContent = `Position: ${userData.position || "Software Engineer"}`;
            if (departmentEl) departmentEl.textContent = `Department: ${userData.department || "IT"}`;
        } else {
            console.warn("'.employee-info' section not found.");
        }

        const profilePic = document.getElementById("profile-pic");
        if (profilePic) {
            profilePic.src = "assets/images/Bhanu.jpeg"; // Or use userData.profilePic if available
        }
    } catch (error) {
        alert(error.message);
    }
}

function clearSessionAndRedirect() {
    localStorage.clear();
    document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
    });
    window.location.href = "login.html";
}
