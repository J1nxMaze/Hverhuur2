// Display captain availability data
function displayCaptainAvailability(data: { name: any; unavailableDates: any[]; }[]) {
    // Example: display captain availability data in a table
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Unavailable Dates</th>
            </tr>
        </thead>
        <tbody>
            ${data.map((item: { name: any; unavailableDates: any[]; }) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.unavailableDates.join(', ')}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Get the container element, and append the table only if the container exists
    document.querySelector('.admin-availability-container')?.appendChild(table);
}

// Call the fetchCaptainAvailability function when the page loads
window.addEventListener('load', fetchCaptainAvailability);
function fetchCaptainAvailability(this: Window, ev: Event) {
    throw new Error("Function not implemented.");
}

