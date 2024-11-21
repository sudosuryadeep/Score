// Array to store feedback data
let feedbacks = [];

// Fetch student data from data.json
let studentsData = [];
let subjects = [];

// Fetch the data from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    subjects = data.subjects; // Store subjects
    studentsData = data.students; // Store students' data
  })
  .catch(error => console.error('Error fetching student data:', error));

// Handle form submission to check results
document.getElementById("subjectForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  let rollNumber = document.getElementById("rollNumber").value;
  let name = document.getElementById("name").value;
  let subject = document.getElementById("subjectSelect").value;

  // Find the student based on roll number and name
  let student = studentsData.find(s => s.roll_number === rollNumber && s.name.toLowerCase() === name.toLowerCase());

  if (student) {
    // Get the index of the selected subject
    let subjectIndex = subjects.indexOf(subject);
    let score = student.scores[subjectIndex]; // Get the score based on the subject index
    
    document.getElementById("scoreDisplay").innerHTML = `
      <h2>Result for ${student.name} (${student.roll_number})</h2>
      <p><strong>Subject:</strong> ${subject.replace(/_/g, " ").toUpperCase()}</p>
      <p><strong>Score:</strong> ${score}</p>`;

    document.getElementById("feedbackSection").style.display = "block"; // Show feedback section
  } else {
    document.getElementById("scoreDisplay").innerHTML = "<p>Student not found. Please check the roll number and name.</p>";
    document.getElementById("feedbackSection").style.display = "none"; // Hide feedback section if student not found
  }
});

// Handle feedback submission
document.getElementById("submitFeedback").addEventListener("click", function() {
  let rollNumber = document.getElementById("rollNumber").value;
  let feedbackText = document.getElementById("feedbackText").value;

  if (feedbackText.trim()) {
    // Store feedback with roll number and feedback text
    feedbacks.push({ roll_number: rollNumber, feedback: feedbackText });

    // Display a success message
    document.getElementById("feedbackResponse").innerHTML = "<p>Feedback submitted successfully!</p>";

    // Display all feedbacks in a list format
    let feedbackList = "<h3>All Feedbacks:</h3><ul>";
    feedbacks.forEach(function(feedback) {
      feedbackList += `<li>Roll No: ${feedback.roll_number}, Feedback: ${feedback.feedback}</li>`;
    });
    feedbackList += "</ul>";
    document.getElementById("feedbackResponse").innerHTML += feedbackList;

    // Clear feedback input field
    document.getElementById("feedbackText").value = "";
  } else {
    document.getElementById("feedbackResponse").innerHTML = "<p>Please enter some feedback.</p>";
  }
});
