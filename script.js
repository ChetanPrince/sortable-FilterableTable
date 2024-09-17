let selectedRow = null;
const button = document.getElementById("submit");
button.addEventListener("click", (e)=>{
    e.preventDefault();
let formData = getData();
const inputs = document.querySelectorAll(".container input");
    // inititalized all values filled at first
    let allFieldsFilled = true;
    //  then going through every input and checking if any value is empty and setting if any field string is empty
    inputs.forEach((input) => {
        if (input.value.trim() === "") {
            allFieldsFilled = false;
        }
    });

    //  once detected any empty field then alert is displayed or else continues to next step 
   if (!allFieldsFilled) {
        alert("Kindly fill in all the required fields.");
        return; //
    }

if(selectedRow === null){
    let uniqueId = document.getElementById("studentRollNo").value;
    let table = document.querySelector(".output tbody");

    if(!table.contains(uniqueId)){
        saveData(formData);
    }else{
        alert("Student data already exists. kindly edit or remove previous record to add new.")
    }
}
else{
    updateData(formData);
}
clearData();
});

function getData(){
    return {
        name: document.getElementById("studentName").value,
        studentRollNo: document.getElementById("studentRollNo").value,
        studentRanking: document.getElementById("studentRanking").value,
        studentGrade: document.getElementById("studentGrade").value,
        studentAttendance: document.getElementById("studentAttendance").value,
        studentMarks: document.getElementById("studentMarks").value
    };
}

function saveData(formData){
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td>${formData.studentAttendance}%</td><td>${formData.studentMarks}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${formData.studentRollNo}')">Delete</button></td>`;
    table.appendChild(tr);
    let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    savedData.push(formData);
    localStorage.setItem("studentData", JSON.stringify(savedData));
}

function clearData(){
    document.getElementById("studentName").value = "";
    document.getElementById("studentRollNo").value = "";
    document.getElementById("studentRanking").value = "";
    document.getElementById("studentGrade").value = "";
    document.getElementById("studentAttendance").value = "";
    document.getElementById("studentMarks").value = "";
}


function updateData(formData){
    selectedRow.cells[0].innerHTML = formData["name"];
    selectedRow.cells[1].innerHTML = formData["studentRollNo"];
    selectedRow.cells[2].innerHTML = formData["studentRanking"];
    selectedRow.cells[3].innerHTML = formData["studentGrade"];
    selectedRow.cells[3].innerHTML = formData["studentAttendance"];
    selectedRow.cells[3].innerHTML = formData["studentMarks"];
    let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    const updatedData = savedData.filter(data => data.studentRollNo !== formData["studentRollNo"]);
    updatedData.push(formData);
    localStorage.setItem("studentData", JSON.stringify(updatedData));
    selectedRow = null;
}
   
function edit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value = selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value = selectedRow.cells[3].innerHTML;
    document.getElementById("studentAttendance").value = selectedRow.cells[3].innerHTML;
    document.getElementById("studentMarks").value = selectedRow.cells[3].innerHTML;
}


function deleteRow(td, studentRollNo){
    let selectedRow = td.parentElement.parentElement;
    selectedRow.remove();
    
    let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    const updatedData = savedData.filter(data => data.studentRollNo !== studentRollNo);
    localStorage.setItem("studentData", JSON.stringify(updatedData));
}


document.querySelectorAll("th").forEach((th, index)=>{
    th.addEventListener("click", ()=> sort(index));
})

function sort(columnIndex){
    let table = document.querySelector(".output tbody");
    const rows = Array.from(table.rows);
    let isAscending = table.getAttribute("data-sort-order") === "asc";

    rows.sort((rowA, rowB)=>{
        const cellA = rowA.cells[columnIndex].innerText.trim();
        const cellB = rowB.cells[columnIndex].innerText.trim();
        if(!isNaN(cellA) && !isNaN(cellB)){
            return isAscending? cellA - cellB: cellB-cellA;        }
            return isAscending? cellA.localeCompare(cellB): cellB.localeCompare(cellA);
    });
    table.innerHTML = "";
    rows.forEach(row=>table.appendChild(row));
    table.setAttribute("data-sort-order", isAscending ? "desc": "asc");
     const headers = document.querySelectorAll("th");
     headers.forEach(header=>
        header.innerHTML = header.innerHTML.replace(/↑|↓/, ""));
        headers[columnIndex].innerHTML +=isAscending?  " ↓" : " ↑"}

        window.onload = loadData;
function loadData(){
    const savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    const table = document.querySelector(".output tbody");
    savedData.forEach((data) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${data.name}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td><td>${formData.studentAttendance}</td><td>${formData.studentMarks}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${data.studentRollNo}')">Delete</button></td>`;
        table.appendChild(tr);
    });
}
        
document.getElementById("filter").addEventListener("click", filterData);

function filterData() {
    // Define a map for field names and corresponding column index
    const filterMap = {
        "nameFilter": 0,       // Name is in the first column
        "rollNoFilter": 1,     // Roll No is in the second column
        "rankingFilter": 2,    // Ranking is in the third column
        "gradeFilter": 3,
        "attendanceFilter":4,
        "marks": 5       // Grade is in the fourth column
    };

    // Get all input fields
    const inputs = {
        nameFilter: document.getElementById("studentName").value.toLowerCase(),
        rollNoFilter: document.getElementById("studentRollNo").value.toLowerCase(),
        rankingFilter: document.getElementById("studentRanking").value.toLowerCase(),
        gradeFilter: document.getElementById("studentGrade").value.toLowerCase(),
        attendanceFilter: document.getElementById("studentAttendance").value.toLowerCase(),
        marksFilter: document.getElementById("studentMarks").value.toLowerCase()
    };

    // Get all table rows
    const rows = document.querySelectorAll(".output tbody tr");

    // Loop through each row to check if it matches the filters
    rows.forEach((row) => {
        const rowData = Array.from(row.cells).map(cell => cell.innerText.toLowerCase());

        let matchesFilter = true;

        // Loop through each input, check the corresponding column if the input has a value
        for (let filter in inputs) {
            const inputValue = inputs[filter];
            if (inputValue !== "") {
                const columnIndex = filterMap[filter];
                // Check if the row's data in this column matches the input value
                matchesFilter = matchesFilter && rowData[columnIndex].includes(inputValue);
            }
        }

        // Show or hide the row based on the filter criteria
        row.style.display = matchesFilter ? "" : "none";
    });
}
