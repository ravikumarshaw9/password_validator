// Get references to DOM elements
        const passwordInput = document.getElementById('passwordInput');
        const lengthRule = document.getElementById('lengthRule');
        const uppercaseRule = document.getElementById('uppercaseRule');
        const lowercaseRule = document.getElementById('lowercaseRule');
        const numberRule = document.getElementById('numberRule');
        const specialRule = document.getElementById('specialRule');
        
        // Get strength indicator bars
        const strengthBars = [
            document.getElementById('bar1'),
            document.getElementById('bar2'),
            document.getElementById('bar3'),
            document.getElementById('bar4'),
            document.getElementById('bar5')
        ];

        // Function to update rule status (valid or invalid)
        function updateRule(ruleElement, isValid) {
            const icon = ruleElement.querySelector('.rule-icon');
            
            // Remove existing classes
            ruleElement.classList.remove('valid', 'invalid');
            
            // Add appropriate class and icon based on validation result
            if (isValid) {
                ruleElement.classList.add('valid');
                icon.textContent = '✅'; // Green checkmark for valid rules
            } else {
                ruleElement.classList.add('invalid');
                icon.textContent = '❌'; // Red X for invalid rules
            }
        }

        // Function to update strength indicator bars
        function updateStrengthIndicator(validCount) {
            // Reset all bars
            strengthBars.forEach(bar => bar.classList.remove('active'));
            
            // Activate bars based on how many rules are satisfied
            for (let i = 0; i < validCount; i++) {
                if (strengthBars[i]) {
                    strengthBars[i].classList.add('active');
                }
            }
        }

        // Main validation function that runs on every keystroke
        function validatePassword() {
            const password = passwordInput.value;
            
            // Define all validation rules using regular expressions
            const rules = {
                // Check if password has at least 8 characters
                length: password.length >= 8,
                
                // Check if password contains at least one uppercase letter
                uppercase: /[A-Z]/.test(password),
                
                // Check if password contains at least one lowercase letter
                lowercase: /[a-z]/.test(password),
                
                // Check if password contains at least one number
                number: /[0-9]/.test(password),
                
                // Check if password contains at least one special character
                // This regex includes common special characters
                special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
            };

            // Update each rule's visual status
            updateRule(lengthRule, rules.length);
            updateRule(uppercaseRule, rules.uppercase);
            updateRule(lowercaseRule, rules.lowercase);
            updateRule(numberRule, rules.number);
            updateRule(specialRule, rules.special);

            // Count how many rules are satisfied
            const validCount = Object.values(rules).filter(Boolean).length;
            
            // Update the strength indicator
            updateStrengthIndicator(validCount);
        }

        // Add event listener to password input field
        // This will run the validation function every time the user types
        passwordInput.addEventListener('input', validatePassword);
        
        // Also run validation when the page loads (in case there's pre-filled data)
        document.addEventListener('DOMContentLoaded', validatePassword);

        // Prevent form submission (since this is just a validator, not a real form)
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
        });