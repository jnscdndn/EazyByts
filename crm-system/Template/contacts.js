// contacts.js

// Example data (replace with actual data handling logic)
let contactsData = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '345-678-9012' }
];

function displayContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    contactsData.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="contact-info">
                <h3>${contact.name}</h3>
                <p>Email: ${contact.email}</p>
                <p>Phone: ${contact.phone}</p>
            </div>
            <div class="btn-group">
                <button class="btn" onclick="openEditContactModal(${contact.id})">Edit</button>
                <button class="btn" onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;
        contactsList.appendChild(contactItem);
    });
}

function addContact() {
    // Replace with actual form handling logic or modal for adding a new contact
    const newContact = {
        id: generateId(), // Generate a unique ID (you can use a library like uuid for this)
        name: 'New Contact',
        email: 'new.contact@example.com',
        phone: '000-000-0000'
    };

    contactsData.push(newContact);
    displayContacts(); // Update the UI to display all contacts including the new one
}
// Function to open Add Contact modal
function openAddContactModal() {
    document.getElementById('modalTitle').textContent = 'Add Contact';
    document.getElementById('contactForm').reset(); // Reset form fields
    document.getElementById('contactModal').style.display = 'block';
}

// Function to open Edit Contact modal
function openEditContactModal(id) {
    const contact = contactsData.find(contact => contact.id === id);
    if (contact) {
        document.getElementById('modalTitle').textContent = 'Edit Contact';
        document.getElementById('contactId').value = contact.id;
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('contactModal').style.display = 'block';
    }
}

// Function to close modal
function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Function to add or edit a contact
function saveContact(event) {
    event.preventDefault(); // Prevent form submission

    const id = document.getElementById('contactId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (id) {
        // Edit contact
        const index = contactsData.findIndex(contact => contact.id === parseInt(id));
        if (index !== -1) {
            contactsData[index] = { id: parseInt(id), name, email, phone };
        }
    } else {
        // Add new contact
        const newContact = {
            id: generateId(),
            name,
            email,
            phone
        };
        contactsData.push(newContact);
    }

    closeContactModal();
    displayContacts();
}

// Function to delete a contact
function deleteContact(id) {
    contactsData = contactsData.filter(contact => contact.id !== id);
    displayContacts();
}

// Function to generate a unique ID (example)
function generateId() {
    return contactsData.length > 0 ? Math.max(...contactsData.map(contact => contact.id)) + 1 : 1;
}

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', saveContact);

// Initial display of contacts
displayContacts();
