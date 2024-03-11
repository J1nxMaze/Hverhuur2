"use strict";
// Display captain availability data
function displayCaptainAvailability(data) {
    var _a;
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
            ${data.map((item) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.unavailableDates.join(', ')}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    // Get the container element, and append the table only if the container exists
    (_a = document.querySelector('.admin-availability-container')) === null || _a === void 0 ? void 0 : _a.appendChild(table);
}
// Call the fetchCaptainAvailability function when the page loads
window.addEventListener('load', fetchCaptainAvailability);
function fetchCaptainAvailability(ev) {
    throw new Error("Function not implemented.");
}
