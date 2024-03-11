// Get the availability form element
const availabilityForm = document.getElementById('availabilityForm') as HTMLFormElement;

// Check if the form element exists
if (availabilityForm) {
    // Add event listener for form submission
    availabilityForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Check if the captain is logged in
        const isLoggedIn = document.cookie.includes('loggedIn=true');
        if (!isLoggedIn) {
            alert('Je moet ingelogd zijn om verlof aan te vragen.');
            return;
        }

        // Proceed with form submission
        const formData = new FormData(this);
        const startDate = new Date(formData.get('startDate') as string);
        const endDate = new Date(formData.get('endDate') as string);

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
            const response = await fetch('/submitAvailability', {
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
        } catch (error) {
            console.error('Fout bij het indienen van verlof:', error);
            alert('Er is een fout opgetreden bij het indienen van verlof');
        }
    });
} else {
    console.error('Element with ID "availabilityForm" not found');
}
