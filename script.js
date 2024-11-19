// Sample initial blood counts
let bloodCounts = {
  "A+": 5,
  "B+": 1,
  "O+": 7,
  "AB+": 2
};

// Function to dynamically update blood counts on the webpage
function updateBloodCounts() {
  document.getElementById("bloodGroupA").textContent = `A+: ${bloodCounts["A+"]} units`;
  document.getElementById("bloodGroupB").textContent = `B+: ${bloodCounts["B+"]} units`;
  document.getElementById("bloodGroupO").textContent = `O+: ${bloodCounts["O+"]} units`;
  document.getElementById("bloodGroupAB").textContent = `AB+: ${bloodCounts["AB+"]} units`;
}

// Initial display of blood counts
updateBloodCounts();

// Get modal elements
const modal = document.getElementById("slipModal");
const slipContent = document.getElementById("slipContent");
const closeBtn = document.getElementsByClassName("close")[0];

// Event listener for the donate form
document.getElementById("donateForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById("name").value;
  const bloodGroup = document.getElementById("bloodGroup").value;
  const email = document.getElementById("email").value;

  // Increment the blood count for the selected blood group
  bloodCounts[bloodGroup] += 1;
  updateBloodCounts();

  // Generate and display the slip
  generateSlip("Donation", name, bloodGroup, email);
});

// Event listener for the request form
document.getElementById("requestForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  // Get form values
  const name = document.getElementById("nameRequest").value;
  const bloodGroup = document.getElementById("bloodGroupRequest").value;
  const email = document.getElementById("emailRequest").value;

  // Decrement the blood count for the selected blood group, ensuring it doesn't go below zero
  if (bloodCounts[bloodGroup] > 0) {
    bloodCounts[bloodGroup] -= 1;
    updateBloodCounts();
    generateSlip("Request", name, bloodGroup, email);
  } else {
    alert("Sorry, the requested blood group is currently out of stock.");
  }
});

// Function to generate and display the slip
function generateSlip(type, name, bloodGroup, email) {
  // Get additional user details (age, phone, address) from the form or somewhere
  const age = document.getElementById("age").value || "N/A";  // Default to "N/A" if not provided
  const phone = document.getElementById("phone").value || "N/A";
  const address = document.getElementById("address").value || "N/A";
  
  // Generate slip content
  slipContent.innerHTML = `
    <h2>${type} Slip</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Blood Group:</strong> ${bloodGroup}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
  `;

  // Display the modal
  modal.style.display = "block";
}

// Close the modal when clicking the close button
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Download the slip as PDF
document.getElementById("downloadSlip").addEventListener("click", function() {
  // Use the browser's print dialog to save as PDF
  window.print();
});
