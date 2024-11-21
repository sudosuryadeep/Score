document.getElementById('subjectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rollNumber = document.getElementById('rollNumber').value.trim();
  const name = document.getElementById('name').value.trim().toLowerCase();  // Convert name to lowercase for case-insensitive comparison
  const selectedSubject = document.getElementById('subjectSelect').value;

  console.log("Roll Number:", rollNumber);
  console.log("Name:", name);
  console.log("Selected Subject:", selectedSubject);

  const data = await fetchData();  // Fetch the JSON data
  let result = null;

  // Search for student by roll number and name
  data.students.forEach(student => {
    console.log("Checking student:", student);
    if (student.roll_number === rollNumber && student.name.trim().toLowerCase() === name) {
      result = student;
    }
  });

  const scoreDisplay = document.getElementById('scoreDisplay');
  if (result) {
    const subjectIndex = data.subjects.indexOf(selectedSubject); // Get the subject index
    console.log("Subject Index:", subjectIndex);
    if (subjectIndex !== -1 && result.scores.hasOwnProperty(subjectIndex)) {
      scoreDisplay.textContent = result.scores[subjectIndex];
    } else {
      scoreDisplay.textContent = "Subject not found.";
    }
  } else {
    scoreDisplay.textContent = "Student not found.";
  }
});
