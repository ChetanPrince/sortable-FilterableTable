const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", ()=>{
    const formData = getData();
    const inputs = document.querySelectorAll(".container input");
    let allFieldsFilled = true;

    // Validate if all input fields are filled
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            allFieldsFilled = false;
        }
    });

    // Show alert if any input is empty
    if (!allFieldsFilled) {
        alert("Kindly fill in all the required fields.");
        return; // Stop here, don't proceed
    }

    // If all fields are filled, proceed to add the data to the table
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td><button onclick="edit()">Edit</button></td><td><button onclick="deleteRow">Delete</button></td>`;
    table.appendChild(tr);

    // Save the data and clear the form
    saveData(formData);
    clearData();
});


function getData(){
    return {
        name: document.getElementById("studentName").value,
        studentRollNo: document.getElementById("studentRollNo").value,
        studentRanking: document.getElementById("studentRanking").value,
        studentGrade: document.getElementById("studentGrade").value
    };
}

function clearData(){
    document.getElementById("studentName").value = "";
    document.getElementById("studentRollNo").value = "";
    document.getElementById("studentRanking").value = "";
    document.getElementById("studentGrade").value = "";
}

function saveData(formData){
    let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    savedData.push(formData);
    localStorage.setItem("studentData", JSON.stringify(savedData));
}

function loadData(){
    const savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    const table = document.querySelector(".output tbody");
    savedData.forEach((data)=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${data.name}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td>`;
        table.appendChild(tr);
    });
}

window.onload = loadData;




