document.getElementById('subjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rollNumber = document.getElementById('rollNumber').value.trim();
  const name = document.getElementById('name').value.trim().toLowerCase();  
  const selectedSubject = document.getElementById('subjectSelect').value;

  const data = await fetchData();  
  let result = null;

  // Search for student by roll number and name
  data.students.forEach(student => {
    if (student.roll_number === rollNumber && student.name.trim().toLowerCase() === name) {
      result = student;
    }
  });

  const scoreDisplay = document.getElementById('scoreDisplay');
  if (result) {
    const subjectIndex = data.subjects.indexOf(selectedSubject); 
    if (subjectIndex !== -1 && result.scores.hasOwnProperty(subjectIndex)) {
      scoreDisplay.textContent = `Score: ${result.scores[subjectIndex]}`;
    } else {
      scoreDisplay.textContent = "Score data is missing for this subject.";
    }
  } else {
    scoreDisplay.textContent = "Student not found.";
  }
});

// Handle Feedback Submission
document.getElementById('submitFeedback').addEventListener('click', async () => {
  const rollNumber = document.getElementById('rollNumber').value.trim();
  const feedback = document.getElementById('feedbackText').value.trim();
  
  if (!rollNumber || !feedback) {
    alert("Please provide your roll number and describe the issue.");
    return;
  }

  const feedbackResponse = document.getElementById('feedbackResponse');
  // Save feedback (In real-world applications, this could be sent to a backend)
  feedbackResponse.textContent = "Thank you! Your feedback has been submitted.";

  // You can store this feedback in a database or send it via email in a real scenario
  console.log(`Feedback from Roll Number ${rollNumber}: ${feedback}`);
});

// Function to fetch JSON data
async function fetchData() {
  const response = await fetch('data.json');  
  const data = await response.json();  
  return data;
}
