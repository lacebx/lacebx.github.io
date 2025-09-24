// script.js
'use strict';




// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // Only the "All" button functionality remains
  for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].classList.add("active"); // Show all items
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

  // JavaScript to handle project card toggle
  document.querySelectorAll('[data-project-toggle]').forEach(item => {
    item.addEventListener('click', function() {
      const projectDetails = this.closest('.project-item').querySelector('.project-details');
      const isVisible = projectDetails.style.display === 'block';
      projectDetails.style.display = isVisible ? 'none' : 'block';
    });
  });


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Handle form submission
form.addEventListener('submit', async function(e) {
  // Show sending state
  formBtn.disabled = true;
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay for UX
    // Simulate the form submission to Formspree
    // This is a placeholder for the actual form submission logic to Formspree
    // Assuming the submission is successful, show a success message
    alert('Your message has been sent successfully!');

    // Clear input fields on successful submission
    formInputs.forEach(input => {
      input.value = ''; // Clear each input field
    });

    // Optionally reset the button state
    formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    formBtn.disabled = false;

  } catch (error) {
    console.error('Form submission error:', error);
    alert('Failed to send message. Please try again later.');
    // No need to clear input fields if there's an error
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Initialize: Hide the AI Playground tab until Projects is clicked
let projectsClicked = false;
const aiPlaygroundNavLink = document.querySelector("[data-nav-link='ai-playground']");
if (aiPlaygroundNavLink) {
  aiPlaygroundNavLink.classList.add("hidden");
}

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    console.log(`Clicked on: ${this.innerHTML}`);
    
    // If "Projects" is clicked and it hasn't been clicked before, reveal AI Playground
    if (this.innerHTML.toLowerCase() === "projects" && !projectsClicked) {
      projectsClicked = true;
      if (aiPlaygroundNavLink) {
        aiPlaygroundNavLink.classList.remove("hidden");
      }
    }
    
    // Activate the corresponding page
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        console.log(`Activating page: ${pages[j].dataset.page}`);
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
      console.log(`Page classes: ${pages[j].classList}`);
    }
  });
}


// --- New AI Playground Filtering Mechanism ---

// Global filter state (default is "all" for both)
let currentModelFilter = "all";
let currentCategoryFilter = "all";

// Get the filter icon button and panel
const aiFilterBtn = document.querySelector(".ai-filter-btn");
const aiFilterPanel = document.querySelector(".ai-filter-panel");

// Toggle the filter panel when the filter icon is clicked
if (aiFilterBtn && aiFilterPanel) {
  aiFilterBtn.addEventListener("click", function() {
    aiFilterPanel.classList.toggle("hidden");
  });
}

// Attach event listeners to each filter option button within the panel
const filterOptions = document.querySelectorAll(".ai-filter-panel .filter-option");
filterOptions.forEach(option => {
  option.addEventListener("click", function() {
    const type = this.getAttribute("data-filter-type");
    const value = this.getAttribute("data-filter-value");
    
    // Remove the "active" class from all options of this type
    filterOptions.forEach(opt => {
      if (opt.getAttribute("data-filter-type") === type) {
        opt.classList.remove("active");
      }
    });
    // Mark the clicked option as active
    this.classList.add("active");
    
    // Update the global filter variable
    if (type === "model") {
      currentModelFilter = value;
    } else if (type === "category") {
      currentCategoryFilter = value;
    }
    
    // Filter the projects based on the selected options
    filterAIPlaygroundProjects();
    
    // Optionally, hide the filter panel after a selection
    // aiFilterPanel.classList.add("hidden");
  });
});

// Function to filter projects in the AI Playground
function filterAIPlaygroundProjects(){
  const projectItems = document.querySelectorAll("article.ai-playground .project-item");
  projectItems.forEach(item => {
    const itemModel = item.getAttribute("data-model") || "all";
    const itemCategory = item.getAttribute("data-category") || "all";
    // Show the item if it matches both filters or if a filter is "all"
    if ((currentModelFilter === "all" || itemModel === currentModelFilter) &&
        (currentCategoryFilter === "all" || itemCategory === currentCategoryFilter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}


// JavaScript to trigger the animation
document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.querySelector('.skills-list');
  const skillFills = document.querySelectorAll('.skill-progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          fill.classList.add('active');
        });
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  });

  observer.observe(skillsSection);
});


 // Railway URL to deploy the chatbot
 const CHATBOT_API_URL = "http://127.0.0.1:8080/chat"; // Local Flask server

 // Flag to track if the bot is processing a request
 let isProcessing = false;

 // Function to append messages to the chat window
 function appendMessage(sender, text) {
   const chatMessages = document.getElementById("chat-messages");
   const message = document.createElement("p");
   message.innerHTML = `<strong style="color: #D3D3D3;">${sender}:</strong> ${text}`;
   message.classList.add(sender === "You" ? "user-message" : "bot-message");
   chatMessages.appendChild(message);
   chatMessages.scrollTop = chatMessages.scrollHeight;
 }

 // Function to show/hide typing indicator
 function showTyping(show) {
   const typingIndicator = document.getElementById("typing-indicator");
   typingIndicator.style.display = show ? "block" : "none";
 }

 // Disable or enable the input and button
 function setInputDisabled(state) {
   document.getElementById("chat-input").disabled = state;
   document.getElementById("chat-send").disabled = state;
 }

 document.getElementById("chat-send").addEventListener("click", function() {
   if (isProcessing) return; // Prevent sending new requests while processing
   const input = document.getElementById("chat-input");
   const query = input.value.trim();
   if (!query) return;

   // Append user's message
   appendMessage("You", query);
   // Clear input and disable it
   input.value = "";
   setInputDisabled(true);
   // Show typing indicator
   showTyping(true);
   isProcessing = true;
   
   // Send the query to the Flask backend
   fetch(CHATBOT_API_URL, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify({ query: query })
   })
   .then(response => response.json())
   .then(data => {
     // Remove typing indicator and re-enable input
     showTyping(false);
     setInputDisabled(false);
     isProcessing = false;
     appendMessage("Lace", data.response || "Sorry, I didn't get that.");
   })
   .catch(error => {
     console.error("Error:", error);
     showTyping(false);
     setInputDisabled(false);
     isProcessing = false;
     appendMessage("Error", "Something went wrong. Please try again later.");
   });
 });

 // Send query on Enter key press
 document.getElementById("chat-input").addEventListener("keydown", function(e) {
   if (e.key === "Enter" && !isProcessing) {
     document.getElementById("chat-send").click();
   }
 });


// Toggle chat widget visibility
const chatWidget = document.getElementById("chat-widget");
const toggleChatButton = document.getElementById("toggle-chat");

// Set chat widget to be hidden by default
chatWidget.style.display = "none";

toggleChatButton.addEventListener("click", function() {
  const isVisible = chatWidget.style.display === "block";
  chatWidget.style.display = isVisible ? "none" : "block";
});

// Function to append messages to the chat window
function appendMessage(sender, text) {
  const chatMessages = document.getElementById("chat-messages");
  const message = document.createElement("p");
  message.innerHTML = `<strong style="color: #D3D3D3;">${sender}:</strong> ${text}`;
  message.classList.add(sender === "You" ? "user-message" : "bot-message");
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show/hide typing indicator
function showTyping(show) {
  const typingIndicator = document.getElementById("typing-indicator");
  typingIndicator.style.display = show ? "block" : "none";
}

// Disable or enable the input and button
function setInputDisabled(state) {
  document.getElementById("chat-input").disabled = state;
  document.getElementById("chat-send").disabled = state;
}

document.getElementById("chat-send").addEventListener("click", function() {
  if (isProcessing) return; // Prevent sending new requests while processing
  const input = document.getElementById("chat-input");
  const query = input.value.trim();
  if (!query) return;

  // Append user's message
  appendMessage("You", query);
  // Clear input and disable it
  input.value = "";
  setInputDisabled(true);
  // Show typing indicator
  showTyping(true);
  isProcessing = true;
  
  // Send the query to the Flask backend
  fetch(CHATBOT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => {
    console.log("Raw response:", response);
    return response.json();
  })
  .then(data => {
    console.log("Parsed data:", data);
    showTyping(false);
    setInputDisabled(false);
    isProcessing = false;
    appendMessage("Lace", data.response || "Sorry, I didn't get that.");
  })
  .catch(error => {
    console.error("Error:", error);
    showTyping(false);
    setInputDisabled(false);
    isProcessing = false;
    appendMessage("Error", "Something went wrong. Please try again later.");
  });
  
});

// Send query on Enter key press
document.getElementById("chat-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !isProcessing) {
    document.getElementById("chat-send").click();
  }
});

// Update the send button's HTML to use an icon
document.getElementById("chat-send").innerHTML = '<ion-icon name="paper-plane"></ion-icon>';

// Add event listener for AI Playground tab
const aiPlaygroundBtn = document.querySelector("[data-nav-link='AI Playground']");
aiPlaygroundBtn.addEventListener("click", function () {
    // Call the function to activate the AI Playground page
    activatePage('ai-playground');
});

// Function to activate the page
function activatePage(page) {
    const pages = document.querySelectorAll("article");
    pages.forEach(p => {
        p.classList.remove("active");
    });
    const activePage = document.querySelector(`article[data-page="${page}"]`);
    if (activePage) {
        activePage.classList.add("active");
        console.log(`Activating page: ${page}`);
    } else {
        console.error(`Page not found: ${page}`);
    }
}

  
