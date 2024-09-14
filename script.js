let selectedRow = null;
const button = document.getElementById("submit");
button.addEventListener("click", ()=>{
    // e.preventDefault();
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
    saveData(formData);
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
        studentGrade: document.getElementById("studentGrade").value
    };
}

function saveData(formData){
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${formData.studentRollNo}')">Delete</button></td>`;
    table.appendChild(tr);
}

function clearData(){
    document.getElementById("studentName").value = "";
    document.getElementById("studentRollNo").value = "";
    document.getElementById("studentRanking").value = "";
    document.getElementById("studentGrade").value = "";
}


    function updateData(formData){
        selectedRow.cells[0].innerHTML = formData["name"];
        selectedRow.cells[1].innerHTML = formData["studentRollNo"];
        selectedRow.cells[2].innerHTML = formData["studentRanking"];
        selectedRow.cells[3].innerHTML = formData["studentGrade"];
        selectedRow = null;
    }
   

// function saveData(formData){
//     let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
//     savedData.push(formData);
//     localStorage.setItem("studentData", JSON.stringify(savedData));
// }

// function loadData(){
//     const savedData = JSON.parse(localStorage.getItem("studentData")) || [];
//     const table = document.querySelector(".output tbody");
//     savedData.forEach((data) => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `<td>${data.name}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${data.studentRollNo}')">Delete</button></td>`;
//         table.appendChild(tr);
//     });
// }
function edit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value = selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value = selectedRow.cells[3].innerHTML;
}
// window.onload = loadData;

function deleteRow(td, studentRollNo){
    let selectedRow = td.parentElement.parentElement;
    selectedRow.remove();
    // let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    
//     const updatedData = savedData.filter(data => data.studentRollNo !== studentRollNo);
    
//     localStorage.setItem("studentData", JSON.stringify(updatedData));
}


// document.querySelectorAll("th").forEach((th, index)=>{
//     th.addEventListener("click", ()=> sort(index));
// })

// function sort(columnIndex){
//     let table = document.querySelector(".output tbody");
//     const rows = Array.from(table.rows);
//     let isAscending = table.getAttribute("data-sort-order") === "asc";

//     rows.sort((rowA, rowB)=>{
//         const cellA = rowA.cells[columnIndex].innerText.trim();
//         const cellB = rowB.cells[columnIndex].innerText.trim();
//         if(!isNaN(cellA) && !isNaN(cellB)){
//             return isAscending? cellA - cellB: cellB-cellA;        }
//             return isAscending? cellA.localeCompare(cellB): cellB.localeCompare(cellA);
//     });
//     table.innerHTML = "";
//     rows.forEach(row=>table.appendChild(row));
//     table.setAttribute("data-sort-order", isAscending ? "desc": "asc");
//      const headers = document.querySelectorAll("th");
//      headers.forEach(header=>
//         header.innerHTML = header.innerHTML.replace(/↑|↓/, ""));
//         headers[columnIndex].innerHTML +=isAscending?  " ↓" : " ↑"}
        