const leaveRequestForm = document.getElementById('leaveRequestForm') as HTMLFormElement;

if (leaveRequestForm) {
    leaveRequestForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const isLoggedIn = document.cookie.includes('loggedIn=true');
        if (!isLoggedIn) {
            alert('Je moet ingelogd zijn om verlof aan te vragen.');
            return;
        }

        const formData = new FormData(this);
        const startDate = new Date(formData.get('startDate') as string);
        const endDate = new Date(formData.get('endDate') as string);

        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 3);

        if (startDate < minDate) {
            alert('Begin verlof moet minimaal 3 dagen in de toekomst zijn.');
            return;
        }

        if (!startDate || !endDate || startDate >= endDate) {
            alert('Vul alle velden correct in. Begin verlof moet voor eind verlof liggen.');
            return;
        }

        try {
            const response = await fetch('/leave-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startDate, endDate })
            });

            if (!response.ok) {
                throw new Error('Failed to submit leave request');
            }

            alert('Verlof succesvol ingediend!');
        } catch (error) {
            console.error('Fout bij het indienen van verlof:', error);
            alert('Er is een fout opgetreden bij het indienen van verlof');
        }
    });
} else {
    console.error('Element with ID "leaveRequestForm" not found');
}
