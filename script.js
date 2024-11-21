document.getElementById('subjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rollNumber = document.getElementById('rollNumber').value;
  const name = document.getElementById('name').value;
  const selectedSubject = document.getElementById('subjectSelect').value;

  const data = await fetchData();  // Fetch the JSON data
  let result = null;

  // Search for student by roll number and name
  data.forEach(student => {
    if (student.roll_number === rollNumber && student.name.toLowerCase() === name.toLowerCase()) {
      result = student;
    }
  });

  const scoreDisplay = document.getElementById('scoreDisplay');
  if (result) {
    if (result.subjects[selectedSubject] !== undefined) {
      scoreDisplay.textContent = result.subjects[selectedSubject];
    } else {
      scoreDisplay.textContent = "Subject not found.";
    }
  } else {
    scoreDisplay.textContent = "Student not found.";
  }
});

// Function to fetch JSON data (this would be replaced with an API or database call in real-world scenarios)
async function fetchData() {
  const response = await fetch('data.json');  // Fetch data from the data.json file
  const data = await response.json();  // Parse the JSON response
  return data;
}
