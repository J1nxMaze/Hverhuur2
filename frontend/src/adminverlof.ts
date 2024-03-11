// Get the container element to display leave requests
const leaveRequestsContainer = document.getElementById('leaveRequests');

// Check if the container element exists
if (leaveRequestsContainer) {
    // Fetch leave requests from the backend
    fetch('/admin/leave-requests')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch leave requests');
            }
            return response.json();
        })
        .then(leaveRequests => {
            console.log('Leave requests:', leaveRequests); // Log the leave requests to the console
            // Render leave requests in the container
            leaveRequestsContainer.innerHTML = renderLeaveRequests(leaveRequests);
        })
        .catch(error => {
            console.error('Error fetching leave requests:', error); // Log the error to the console
            // Display error message on failure
            leaveRequestsContainer.innerHTML = '<p>Error fetching leave requests</p>';
        });
} else {
    console.error('Element with ID "leaveRequests" not found'); // Log error if container element not found
}

// Function to render leave requests as HTML
function renderLeaveRequests(leaveRequests: any[]) {
    if (!leaveRequests || leaveRequests.length === 0) {
        return '<p>No leave requests found</p>';
    }

    // Generate HTML for leave requests
    const html = leaveRequests.map(request => {
        return `
            <div class="leave-request">
                <div><strong>Captain Email:</strong> ${request.Captain_Email}</div>
                <div><strong>Start Date:</strong> ${request.Start_Date}</div>
                <div><strong>End Date:</strong> ${request.End_Date}</div>
            </div>
        `;
    }).join('');

    return html;
}
