
// ==========================================
// File Upload Handling
// ==========================================

let documentInput =
    document.getElementById("document");

let removeFileButton =
    document.getElementById("removeFile");

let fileMessage =
    document.getElementById("fileMessage");


// Show selected file name
documentInput.addEventListener("change", function () {

    if (documentInput.files.length > 0) {

        fileMessage.textContent =
            "Selected file: " +
            documentInput.files[0].name;

    }

});


// Remove selected file
removeFileButton.addEventListener("click", function () {

    documentInput.value = "";

    fileMessage.textContent =
        "File removed. Please select a new file.";

});
// ==========================================
// CityCare Hospital
// Patient Registration Validation
// ==========================================
let patientForm = document.getElementById("patientForm");

patientForm.addEventListener("submit", function (event) {

    // Prevent normal form submission
    event.preventDefault();


    // Get validation message area
    let validationMessage =
        document.getElementById("validationMessage");

    // Clear previous message
    validationMessage.textContent = "";


    // ==========================================
    // Get Form Values
    // ==========================================

    let patientName =
        document.getElementById("patientName").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let mobile =
        document.getElementById("mobile").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    // ==========================================
    // Basic Input Validation
    // ==========================================

   if (
    patientName.includes("<") ||
    patientName.includes(">") ||
    email.includes("<") ||
    email.includes(">") ||
    address.includes("<") ||
    address.includes(">")
) {

        validationMessage.textContent =
            "❌ Invalid characters are not allowed.";

        return;
    }


    // ==========================================
    // Regular Expressions
    // ==========================================

    // Patient name: letters and spaces only
    let namePattern = /^[A-Za-z ]{2,50}$/;

    // Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Mobile: exactly 10 digits
    let mobilePattern = /^\d{10}$/;

    // Password:
    // 8 or more characters
    // uppercase
    // lowercase
    // number
    // special character
    let passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    // ==========================================
    // Patient Name Validation
    // ==========================================

    if (patientName === "") {

        validationMessage.textContent =
            "❌ Please enter the patient name.";

        return;
    }


    if (!namePattern.test(patientName)) {

        validationMessage.textContent =
            "❌ Patient name must contain only letters and spaces.";

        return;
    }


    // ==========================================
    // Email Validation
    // ==========================================

    if (email === "") {

        validationMessage.textContent =
            "❌ Please enter the email address.";

        return;
    }


    if (!emailPattern.test(email)) {

        validationMessage.textContent =
            "❌ Please enter a valid email address.";

        return;
    }


    // ==========================================
    // Mobile Validation
    // ==========================================

    if (mobile === "") {

        validationMessage.textContent =
            "❌ Please enter the mobile number.";

        return;
    }


    if (!mobilePattern.test(mobile)) {

        validationMessage.textContent =
            "❌ Mobile number must contain exactly 10 digits.";

        return;
    }


    // ==========================================
    // Password Validation
    // ==========================================

    if (!passwordPattern.test(password)) {

        validationMessage.textContent =
            "❌ Password must contain at least 8 characters, " +
            "one uppercase letter, one lowercase letter, " +
            "one number and one special character.";

        return;
    }


    // ==========================================
    // Confirm Password Validation
    // ==========================================

    if (password !== confirmPassword) {

        validationMessage.textContent =
            "❌ Password and Confirm Password do not match.";

        return;
    }


    // ==========================================
    // Successful Registration
    // ==========================================

    validationMessage.textContent =
        "✅ Patient registration successful!";

});