"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get the availability form element
const availabilityForm = document.getElementById('availabilityForm');
// Check if the form element exists
if (availabilityForm) {
    // Add event listener for form submission
    availabilityForm.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            // Check if the captain is logged in
            const isLoggedIn = document.cookie.includes('loggedIn=true');
            if (!isLoggedIn) {
                alert('Je moet ingelogd zijn om verlof aan te vragen.');
                return;
            }
            // Proceed with form submission
            const formData = new FormData(this);
            const startDate = new Date(formData.get('startDate'));
            const endDate = new Date(formData.get('endDate'));
            // Calculate the current date plus three days
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + 3);
            // Check if the start date is at least 3 days ahead
            if (startDate < minDate) {
                alert('Begin verlof moet minimaal 3 dagen in de toekomst zijn.');
                return;
            }
            // Check if all fields are filled out
            if (!startDate || !endDate || startDate >= endDate) {
                alert('Vul alle velden correct in. Begin verlof moet voor eind verlof liggen.');
                return;
            }
            try {
                const response = yield fetch('/submitAvailability', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ startDate, endDate })
                });
                if (!response.ok) {
                    throw new Error('Failed to submit availability');
                }
                alert('Verlof succesvol ingediend!');
            }
            catch (error) {
                console.error('Fout bij het indienen van verlof:', error);
                alert('Er is een fout opgetreden bij het indienen van verlof');
            }
        });
    });
}
else {
    console.error('Element with ID "availabilityForm" not found');
}
