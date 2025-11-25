// Wait for the DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // Get all the elements we need from the HTML
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const terms = document.getElementById('terms');

    // Add a 'submit' event listener to the form
    form.addEventListener('submit', (e) => {
        // Prevent the form from actually submitting
        e.preventDefault();
        
        // Run our validation function
        let isFormValid = checkInputs();

        if (isFormValid) {
            // If the form is valid, show a success message
            // In a real app, you would submit data to a server here
            alert('Form submitted successfully!');
            form.reset(); // Clear the form
            // Remove success classes
            document.querySelectorAll('.form-control.success').forEach((el) => {
                el.classList.remove('success');
            });
        }
    });

    function checkInputs() {
        // Get the values from the inputs, trimming whitespace
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = password2.value.trim();
        const termsValue = terms.checked; // This is a boolean

        let isValid = true; // Flag to track overall form validity

        // Username validation
        if (usernameValue === '') {
            setError(username, 'Username cannot be blank');
            isValid = false;
        } else {
            setSuccess(username);
        }

        // Email validation
        if (emailValue === '') {
            setError(email, 'Email cannot be blank');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Not a valid email');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Password validation
        if (passwordValue === '') {
            setError(password, 'Password cannot be blank');
            isValid = false;
        } else if (passwordValue.length < 8) {
            setError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            setSuccess(password);
        }

        // Confirm Password validation
        if (password2Value === '') {
            setError(password2, 'Please confirm your password');
            isValid = false;
        } else if (passwordValue !== password2Value) {
            setError(password2, 'Passwords do not match');
            isValid = false;
        } else {
            setSuccess(password2);
        }

        // Terms & Conditions validation
        if (!termsValue) {
            setError(terms, 'You must agree to the terms');
            isValid = false;
        } else {
            setSuccess(terms);
        }

        return isValid;
    }

    // --- Helper Functions ---

    // Show error message and add error class
    function setError(input, message) {
        const formControl = input.parentElement; // .form-control
        const small = formControl.querySelector('small');
        
        small.innerText = message; // Add the error message
        formControl.className = 'form-control error'; // Add error class
    }

    // Show success (green check)
    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success'; // Add success class
    }

    // Basic regex for email validation
    function isValidEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }
});