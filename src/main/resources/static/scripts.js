// scripts.js
// Function to handle registration
function register() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    };

    // Assume you have an API endpoint for registration, replace "/api/register" with your actual endpoint
    fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                alert("Registration successful! Please login.");
                // Redirect to login page after successful registration
                window.location.href = "Login";
            } else {
                // Display the error status and message
                response.json().then(error => {
                    alert(`Registration failed. ${response.status} - ${error.message}`);
                });
            }
        })
        .catch(error => {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        });
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "Login";
}

// Function to handle login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Assume you have an API endpoint for login, replace "/api/login" with your actual endpoint
    fetch("/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(user => {
            if (user) {
                alert("Login successful.");
                // Redirect to the main page
                window.location.href = "/";
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        });
}

// Function to handle contacts
function loadContacts() {
    fetch("/contacts")
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById("contact-list");
            contactList.innerHTML = "";

            data.forEach(contact => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td>${contact.review}</td>
                    <td>
                        <button onclick="editContact(${contact.id})" class="edit-button">Edit</button>
                        <button onclick="deleteContact(${contact.id})">Delete</button>
                    </td>
                `;
                contactList.appendChild(row);
            });
        });
}

function addContact() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const reviewInput = document.getElementById("review");

    const contact = {
        name: nameInput.value,
        email: emailInput.value,
        review: reviewInput.value
    };

    fetch("/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
        .then(response => {
            if (response.ok) {
                loadContacts();
                nameInput.value = "";
                emailInput.value = "";
                reviewInput.value = "";
            }
        });
}

function editContact(contactId) {
    const newName = prompt("Enter the new name:");
    const newEmail = prompt("Enter the new email:");
    const newReview = prompt("Enter the new review:");

    if (newName && newEmail) {
        const updatedContact = {
            name: newName,
            email: newEmail,
            review: newReview
        };

        fetch(`/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedContact)
        })
            .then(response => {
                if (response.ok) {
                    loadContacts();
                }
            });
    }
}

function deleteContact(contactId) {
    fetch(`/contacts/${contactId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (response.ok) {
                loadContacts();
            }
        });
}

loadContacts();

