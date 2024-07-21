document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = event.target.name.value;
        const email = event.target.email.value;
        const message = event.target.message.value;

        // You can replace this with actual form submission logic
        console.log('Contact Form Submitted');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);

        // Clear the form
        contactForm.reset();

        // Show a success message (optional)
        alert('Thank you for contacting us! We will get back to you soon.');
    });
});
