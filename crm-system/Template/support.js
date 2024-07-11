// Example data (replace with actual data handling logic)
let supportData = [
    { id: 1, subject: 'Issue A', description: 'Description for issue A', status: 'Open' },
    { id: 2, subject: 'Issue B', description: 'Description for issue B', status: 'In Progress' },
    { id: 3, subject: 'Issue C', description: 'Description for issue C', status: 'Closed' }
];

// Function to display support tickets
function displaySupport() {
    const supportList = document.getElementById('supportList');
    supportList.innerHTML = '';

    supportData.forEach(ticket => {
        const supportItem = document.createElement('div');
        supportItem.classList.add('support-item');
        supportItem.innerHTML = `
            <h3>${ticket.subject}</h3>
            <p>${ticket.description}</p>
            <p>Status: ${ticket.status}</p>
            <div class="btn-group">
                <button class="btn" onclick="openEditSupportModal(${ticket.id})">Edit</button>
                <button class="btn" onclick="deleteSupport(${ticket.id})">Delete</button>
            </div>
        `;
        supportList.appendChild(supportItem);
    });
}

// Function to open Add Ticket modal
function openAddSupportModal() {
    document.getElementById('modalTitle').textContent = 'Add Ticket';
    document.getElementById('supportForm').reset(); // Reset form fields
    document.getElementById('supportId').value = ''; // Ensure supportId is empty
    document.getElementById('supportModal').style.display = 'block';
}

// Function to open Edit Ticket modal
function openEditSupportModal(id) {
    const ticket = supportData.find(ticket => ticket.id === id);
    if (ticket) {
        document.getElementById('modalTitle').textContent = 'Edit Ticket';
        document.getElementById('supportId').value = ticket.id;
        document.getElementById('subject').value = ticket.subject;
        document.getElementById('description').value = ticket.description;
        document.getElementById('status').value = ticket.status;
        document.getElementById('supportModal').style.display = 'block';
    }
}

// Function to close modal
function closeSupportModal() {
    document.getElementById('supportModal').style.display = 'none';
}

// Function to add or edit a support ticket
function saveSupport(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('supportId').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    if (id) {
        // Edit ticket
        const index = supportData.findIndex(ticket => ticket.id === parseInt(id));
        if (index !== -1) {
            supportData[index] = { id: parseInt(id), subject, description, status };
        }
    } else {
        // Add new ticket
        const newTicket = {
            id: generateId(),
            subject,
            description,
            status
        };
        supportData.push(newTicket);
    }

    closeSupportModal();
    displaySupport();
}

// Function to delete a support ticket
function deleteSupport(id) {
    supportData = supportData.filter(ticket => ticket.id !== id);
    displaySupport();
}

// Function to generate a unique ID (example)
function generateId() {
    return supportData.length > 0 ? Math.max(...supportData.map(ticket => ticket.id)) + 1 : 1;
}

// Event listener for form submission
document.getElementById('supportForm').addEventListener('submit', saveSupport);

// Initial display of support tickets
displaySupport();
