// Select the form element
const form = document.querySelector('#contact-form');

// Add an event listener for the form submission
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form values
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const message = form.elements['message'].value;

  // Validate the form values
  const errors = [];
  if (name.trim() === '') {
    errors.push('Name is required');
  }
  if (email.trim() === '') {
    errors.push('Email is required');
  }
  if (message.trim() === '') {
    errors.push('Message is required');
  }

  // If there are errors, display them
  if (errors.length > 0) {
    const errorList = document.querySelector('#errors');
    errorList.innerHTML = '';
    for (const error of errors) {
      const li = document.createElement('li');
      li.textContent = error;
      errorList.appendChild(li);
    }
  } else {
    // Otherwise, submit the form
    form.submit();
  }
  
});

