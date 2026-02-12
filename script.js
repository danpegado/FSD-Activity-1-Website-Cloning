document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. FORM VALIDATION (Red/Green Feedback)
    // ==========================================
    
    // Select Elements
    const form = document.getElementById('heroForm');
    const emailInput = document.getElementById('emailInput');
    const messageDisplay = document.getElementById('validationMessage');

    // Email Regex Pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form) {
        form.addEventListener('submit', function(e) {
            
            // Prevent page refresh
            e.preventDefault();

            const emailValue = emailInput.value.trim();

            // Clear previous styles
            clearFeedback();

            // --- Validation Logic ---
            if (emailValue === "") {
                showFeedback("Email is required.", "error");
            } 
            else if (!emailPattern.test(emailValue)) {
                showFeedback("Please enter a valid email address.", "error");
            } 
            else {
                showFeedback("Success! Your membership has started.", "success");
                // Optional: form.submit() would happen here in a real app
            }
        });

        // Clear error when user starts typing again
        emailInput.addEventListener('input', clearFeedback);
    }

    // Helper: Show Message & Add Styles
    function showFeedback(message, type) {
        messageDisplay.innerText = message;

        if (type === "error") {
            messageDisplay.classList.add("msg-error");
            emailInput.classList.add("input-error");
        } else {
            messageDisplay.classList.add("msg-success");
            emailInput.classList.add("input-success");
        }
    }

    // Helper: Reset Styles
    function clearFeedback() {
        messageDisplay.innerText = "";
        messageDisplay.classList.remove("msg-error", "msg-success");
        emailInput.classList.remove("input-error", "input-success");
    }

    // ==========================================
    // 2. FAQ ACCORDION (One Open at a Time)
    // ==========================================
    const detailsElements = document.querySelectorAll("details");

    detailsElements.forEach((detail) => {
        detail.addEventListener("toggle", () => {
            if (detail.open) {
                // Close all other open details
                detailsElements.forEach((otherDetail) => {
                    if (otherDetail !== detail && otherDetail.open) {
                        otherDetail.removeAttribute("open");
                    }
                });
            }
        });
    });

    // ==========================================
    // 3. THEME TOGGLE (Light/Dark Mode)
    // ==========================================
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeBtn.innerText = "Dark Mode";
        themeBtn.style.backgroundColor = "#e50914"; 
        themeBtn.style.color = "#fff";
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                themeBtn.innerText = "Dark Mode";
                themeBtn.style.backgroundColor = "#e50914";
                themeBtn.style.color = "#fff";
                localStorage.setItem('theme', 'light');
            } else {
                themeBtn.innerText = "Light Mode";
                themeBtn.style.backgroundColor = "#333";
                themeBtn.style.color = "#fff";
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});