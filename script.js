document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const contactIdInput = document.getElementById('contactId');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const cancelEditButton = document.getElementById('cancelEdit');

    let contacts = loadContacts();
    displayContacts();

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addContact();
    });

    cancelEditButton.addEventListener('click', () => {
        contactForm.reset();
        contactIdInput.value = '';
        cancelEditButton.style.display = 'none';
    });

    function displayContacts() {
        contactList.innerHTML = '';
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.className = 'list-group-item contact-item';
            li.innerHTML = `
                <div class="contact-info">
                    <h5>${contact.name}</h5>
                    <p>Phone: ${contact.phone}</p>
                    <p>Email: ${contact.email}</p>
                </div>
                <div class="contact-actions">
                    <button class="btn btn-sm btn-info edit-btn" data-id="${contact.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${contact.id}">Delete</button>
                </div>
            `;
            contactList.appendChild(li);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                editContact(event.target.dataset.id);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                deleteContact(event.target.dataset.id);
            });
        });
    }

    function addContact() {
        const id = contactIdInput.value;
        const name = nameInput.value;
        const phone = phoneInput.value;
        const email = emailInput.value;

        if (id) {
            // Edit existing contact
            const contactIndex = contacts.findIndex(contact => contact.id == id);
            if (contactIndex > -1) {
                contacts[contactIndex] = { id: parseFloat(id), name, phone, email };
            }
        } else {
            // Add new contact
            const newContact = {
                id: Date.now(),
                name,
                phone,
                email
            };
            contacts.push(newContact);
        }

        saveContacts();
        displayContacts();
        contactForm.reset();
        contactIdInput.value = '';
        cancelEditButton.style.display = 'none';
    }

    function editContact(id) {
        const contact = contacts.find(c => c.id == id);
        if (contact) {
            contactIdInput.value = contact.id;
            nameInput.value = contact.name;
            phoneInput.value = contact.phone;
            emailInput.value = contact.email;
            cancelEditButton.style.display = 'inline-block';
        }
    }

    function deleteContact(id) {
        contacts = contacts.filter(contact => contact.id != id);
        saveContacts();
        displayContacts();
    }

    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        const savedContacts = localStorage.getItem('contacts');
        return savedContacts ? JSON.parse(savedContacts) : [];
    }
});