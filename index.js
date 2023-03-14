// Get the form and table elements
const form = document.getElementById('registration-form');
const table = document.getElementById('entries-table');

// Retrieve existing form data from local storage
let formData = JSON.parse(localStorage.getItem('formData')) || [];

// Function to add new form data to the table and save to local storage
function addFormDataToTable(formData) {
  // Create a new row element
  const newRow = document.createElement('tr');

  // Create table cells for each form field
  const nameCell = document.createElement('td');
  const emailCell = document.createElement('td');
  const passwordCell = document.createElement('td');
  const dobCell = document.createElement('td');
  const acceptTermsCell = document.createElement('td');

  // Set the text content of each table cell to the corresponding form field value
  nameCell.textContent = formData.name;
  emailCell.textContent = formData.email;
  passwordCell.textContent = formData.password;
  dobCell.textContent = formData.dob;
  acceptTermsCell.textContent = formData.acceptTerms ? 'Yes' : 'No';

  // Append the table cells to the new row
  newRow.appendChild(nameCell);
  newRow.appendChild(emailCell);
  newRow.appendChild(passwordCell);
  newRow.appendChild(dobCell);
  newRow.appendChild(acceptTermsCell);

  // Append the new row to the table
  table.appendChild(newRow);

  // Save the updated form data to local storage
  const returnValue = localStorage.setItem('formData', JSON.stringify(formData));
  return returnValue;
}

// Function to validate the email address
function validateEmail(email) {
  // Regular expression to match valid email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add an event listener for the form submit button
document.addEventListener('DOMContentLoaded', function() {
  form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const acceptTerms = document.getElementById('accept-terms').checked;

    // Validate the email address
    if (!validateEmail(email)) {
      alert('Invalid email address');
      return;
    }

    // Validate the age
    const birthDate = new Date(dob);
    const age = Math.floor((Date.now() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18 || age > 55) {
      alert('You must be between 18 and 55 years old to register');
      return;
    }

    // Add the form data to the array
if (Array.isArray(formData)) {
    formData.push({ name, email, password, dob, acceptTerms });
  } else {
    formData = [{ name, email, password, dob, acceptTerms }];
  }
  
  // Add the form data to the table
  addFormDataToTable(formData[formData.length - 1]);
  
  // Save the updated form data to local storage
  localStorage.setItem('formData', JSON.stringify(formData));
  
  });
});
