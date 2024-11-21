const studentsData = [
    {
        "roll_number": "12345",
        "name": "John Doe",
        "subjects": {
            "mathematics_engineering": 85,
            "physics_engineering": 78,
            "basic_economics_engineering": 90,
            "basic_electrical_engineering": 88,
            "professional_communication": 92,
            "workshop": 80
        }
    },
    {
        "roll_number": "67890",
        "name": "Jane Doe",
        "subjects": {
            "mathematics_engineering": 95,
            "physics_engineering": 89,
            "basic_economics_engineering": 93,
            "basic_electrical_engineering": 91,
            "professional_communication": 85,
            "workshop": 88
        }
    }
];

// Function to search student result
function searchResult() {
    const rollNumber = document.getElementById('rollNumber').value;
    const name = document.getElementById('name').value;
    const resultDisplay = document.getElementById('resultDisplay');
    const subjectScores = document.getElementById('subjectScores');
    const studentName = document.getElementById('studentName');

    let studentFound = false;

    // Clear previous result and feedback
    subjectScores.innerHTML = "";
    studentName.innerHTML = "";
    document.getElementById('feedbackForm').style.display = "none";
    document.getElementById('feedbackStatus').innerHTML = "";

    // Search for student
    for (const student of studentsData) {
        if (student.roll_number === rollNumber && student.name.toLowerCase() === name.toLowerCase()) {
            studentFound = true;
            studentName.innerHTML = `${student.name}'s Result`;
            let subjects = Object.keys(student.subjects);
            subjects.forEach(subject => {
                const scoreDiv = document.createElement('div');
                scoreDiv.innerHTML = `${subject.replace(/_/g, ' ').toUpperCase()}: ${student.subjects[subject]}`;
                subjectScores.appendChild(scoreDiv);
            });

            // Show feedback form
            document.getElementById('feedbackForm').style.display = "block";
            break;
        }
    }

    if (!studentFound) {
        resultDisplay.innerHTML = "<h2>Student not found</h2>";
    }
}

// Function to submit feedback
function submitFeedback() {
    const feedbackText = document.getElementById('feedbackText').value;
    if (feedbackText.trim() === "") {
        alert("Please enter some feedback.");
        return;
    }

    document.getElementById('feedbackStatus').innerHTML = "<p>Feedback submitted successfully! Thank you for your feedback.</p>";
    document.getElementById('feedbackText').value = "";  // Clear feedback input
}
