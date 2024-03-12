window.addEventListener('load', async () => {
    const leaveRequestsContainer = document.getElementById('leaveRequests');
    if (!leaveRequestsContainer) {
        console.error('Leave requests container not found');
        return;
    }

    try {
        const response = await fetch('http://localhost:4001/api/verlof', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch leave requests');
        }
        const leaveRequests = await response.json();
        renderLeaveRequests(leaveRequests);
    } catch (error) {
        console.error('Error fetching leave requests:', error);
    }
});

function renderLeaveRequests(leaveRequests: any[]) {
    const leaveRequestsContainer = document.getElementById('leaveRequests');
    if (!leaveRequestsContainer) return;

    leaveRequests.forEach(request => {
        const requestElement = document.createElement('div');
        requestElement.textContent = `Start Date: ${request.startDate}, End Date: ${request.endDate}`;
        leaveRequestsContainer.appendChild(requestElement);
    });
}
