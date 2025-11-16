document.addEventListener("DOMContentLoaded", function () {
    const nameInput    = document.getElementById("name");
    const emailInput   = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    
    // Allowed character regex for name
    const allowedChars = /^(?=.*[A-Za-z])[A-Za-z\s]*$/;
    
    function showError(input, message){
        const errorOutput = document.getElementById(input.id + "-error");
        errorOutput.textContent = message;
        errorOutput.classList.remove("hidden");
        input.classList.add("flash");
    
        setTimeout(() => {
            errorOutput.classList.add("hidden");
            input.classList.remove("flash");
        }, 2000);
    }
    
    // Masking input for Name and Comments
    function enforceCharacterRules(event){
        if(!allowedChars.test(event.target.value)){
            showError(event.target, "Invalid character entered.");
            event.target.value = event.target.value.replace(/[^A-Za-z\s]/g, "");
        }
    }

    // Using setCustomValidity() to only allow submission of gmail users
    function enforceGmail(){
        // Validate with the built-in constraints
        emailInput.setCustomValidity("");
        if (!emailInput.checkValidity() && !emailInput.validity.valueMissing) {
            showError(emailInput, "Please use @gmail.com address only.");
        }

        // Extend with a custom constraints
        if (!emailInput.value.endsWith("@gmail.com")) {
            emailInput.setCustomValidity("Please enter an email address of @gmail.com");
        }   
    }

    function enforceTextLength(input){
        let max = input.maxLength;
        let length = input.value.length;
        let charsLeft = max - length;

        const errorOutput = document.getElementById(input.id + "-error");

        // Always show countdown
        errorOutput.textContent = `${charsLeft} characters remaining.`;
        errorOutput.classList.remove("hidden");

        // Remove previous styles
        errorOutput.classList.remove("len-limit-error-medium", "len-limit-error-strong");

        // % of the limit used
        let percent = length / max;

        // Apply intensity based on how close they are
        if (percent >= 0.8) {
            errorOutput.classList.add("len-limit-error-strong");   // red + bold
        } else if (percent >= 0.6) {
            errorOutput.classList.add("len-limit-error-medium");   // darker + semi-bold
        }

        // Handle actual limit
        if (length > max) {
            errorOutput.textContent = "Maximum characters reached";
        } 
    }
    
    nameInput.addEventListener("input", enforceCharacterRules);
    nameInput.addEventListener("invalid", (e) => {
        showError(nameInput, "Please enter your name.");
    });

    emailInput.addEventListener("input", enforceGmail);
    subjectInput.addEventListener("input", () => enforceTextLength(subjectInput));
    messageInput.addEventListener("input", () => enforceTextLength(messageInput));

});

