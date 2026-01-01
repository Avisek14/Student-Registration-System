// ============================================================
// STUDENT REGISTRATION SYSTEM - JAVASCRIPT
// ============================================================
// This application manages student records with CRUD operations
// Features: Add, Edit, Delete, Validate, and Persist data
// ============================================================

// ============================================================
// DATA INITIALIZATION
// ============================================================
// Load existing students from localStorage or initialize empty array
// This ensures data persists across browser sessions
let students = JSON.parse(localStorage.getItem("students")) || [];

// Get reference to the table body element where student rows will be rendered
const tableBody = document.getElementById("tableBody");


// ============================================================
// RENDER FUNCTION
// ============================================================
// Purpose: Display all students in the table and update localStorage
// Called after: Add, Edit, Delete operations
function render() {
  // Clear existing table content to prevent duplication
  tableBody.innerHTML = "";
  
  // Loop through each student and create a table row
  // 's' = student object, 'i' = index for edit/delete operations
  students.forEach((s, i) => {
    tableBody.innerHTML += `
        <tr class="border-b">
          <td class="p-2">${s.name}</td>
          <td>${s.sid}</td>
          <td>${s.email}</td>
          <td>${s.contact}</td>
          <td class="space-x-2">
            <button onclick="editStudent(${i})"
              class="bg-yellow-400 px-2 py-1 rounded hover:scale-95 transition duration-300">Edit</button>
            <button onclick="deleteStudent(${i})"
              class="bg-red-500 text-white px-2 py-1 rounded hover:scale-95 transition duration-500">Delete</button>
          </td>
        </tr>`;
  });
  
  // Save updated students array to localStorage for data persistence
  localStorage.setItem("students", JSON.stringify(students));
}

// ============================================================
// FORM SUBMISSION HANDLER
// ============================================================
// Purpose: Handle Add/Edit student operations with validation
// Triggers on: Form submit event
document.getElementById("studentForm").addEventListener("submit", (e) => {
  // Prevent default form submission (page reload)
  e.preventDefault();

  // ============================================================
  // GET FORM DATA
  // ============================================================
  // Retrieve and trim input values to remove extra spaces
  let name = document.getElementById("name").value.trim();
  let sid = document.getElementById("sid").value.trim();
  let email = document.getElementById("email").value.trim();
  let contact = document.getElementById("contact").value.trim();
  
  // Get editIndex to determine if we're adding new or editing existing
  // Empty string = Add mode, Number = Edit mode
  let editIndex = document.getElementById("editIndex").value;

  // ============================================================
  // VALIDATION CHECKS
  // ============================================================
  // Check if any field is empty
  if (!name || !sid || !email || !contact) {
    alert("All fields required");
    return;
  }
  
  // Name validation: Only alphabetic characters and spaces allowed
  if (!/^[A-Za-z ]+$/.test(name)) return alert("Name only letters");
  
  // Student ID validation: Only numeric characters allowed
  if (!/^[0-9]+$/.test(sid)) return alert("ID only numbers");
  
  // Contact validation: Minimum 10 digits required
  if (!/^[0-9]{10,}$/.test(contact)) return alert("Contact min 10 digits");

  // ============================================================
  // CREATE STUDENT OBJECT
  // ============================================================
  // Store validated data in object format
  let data = { name, sid, email, contact };

  // ============================================================
  // ADD OR UPDATE STUDENT
  // ============================================================
  if (editIndex === "") {
    // ADD MODE: Push new student to array
    students.push(data);
  } else {
    // EDIT MODE: Replace existing student at specified index
    students[editIndex] = data;
    
    // Reset editIndex to return to Add mode after update
    document.getElementById("editIndex").value = "";
  }

  // Clear form inputs after successful submission
  e.target.reset();
  
  // Re-render table with updated data
  render();
});

// ============================================================
// DELETE STUDENT FUNCTION
// ============================================================
// Purpose: Remove student from array by index
// Parameter: i = index of student to delete
function deleteStudent(i) {
  // Remove 1 element at position 'i' from students array
  students.splice(i, 1);
  
  // Re-render table to reflect deletion
  render();
}

// ============================================================
// EDIT STUDENT FUNCTION
// ============================================================
// Purpose: Populate form with student data for editing
// Parameter: i = index of student to edit
function editStudent(i) {
  // Get student object at specified index
  let s = students[i];
  
  // Populate form fields with student data
  name.value = s.name;
  sid.value = s.sid;
  email.value = s.email;
  contact.value = s.contact;
  
  // Set editIndex to indicate Edit mode
  // This value is used in form submission to update instead of add
  editIndex.value = i;
}

// ============================================================
// INITIAL RENDER
// ============================================================
// Display existing students when page loads
render();

// ============================================================
// TYPING EFFECT ANIMATION
// ============================================================
// Purpose: Create typewriter effect for description text
// Adds visual appeal to the UI

// The text content to be typed character by character
const text = "An interactive web application that helps in maintaining student records digitally";

// Get reference to the paragraph element where text will be displayed
const p = document.getElementById("typingText");

// Index to track current character position
let index = 0;

// Recursive function to create typing animation
function typeEffect() {
  // Check if there are more characters to type
  if (index < text.length) {
    // Append next character to paragraph
    p.textContent += text[index];
    
    // Move to next character
    index++;
    
    // Call function again after 40ms delay (controls typing speed)
    setTimeout(typeEffect, 40); // speed control
  }
}

// Start the typing effect animation
typeEffect();
