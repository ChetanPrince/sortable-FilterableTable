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
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${formData.studentRollNo}')">Delete</button></td>`;
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
    savedData.forEach((data) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${data.name}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${data.studentRollNo}')">Delete</button></td>`;
        table.appendChild(tr);
    });
}
function edit(td){
    let selectedRow = td.parentElement.parentElement;
    console.log(typeof(selectedRow.cells[0].innerHTML));
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value = selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value = selectedRow.cells[3].innerHTML;
}
window.onload = loadData;

// Delete row and corresponding data from localStorage
function deleteRow(td, studentRollNo){
    // Remove the selected row from the table
    let selectedRow = td.parentElement.parentElement;
    selectedRow.remove();

    // Remove the corresponding data from localStorage
    let savedData = JSON.parse(localStorage.getItem("studentData")) || [];
    
    // Filter out the deleted item by studentRollNo
    const updatedData = savedData.filter(data => data.studentRollNo !== studentRollNo);
    
    // Save the updated data back to localStorage
    localStorage.setItem("studentData", JSON.stringify(updatedData));
}


// In this sort function we need to grab th elements and upon click an ascending or descending order method has to be used on the same index of the td element and an arrow showing whether it is an ascending order or descending order data is should be displayed




function sort(){
    let tableHead = document.querySelector(".output").getElementsByTagName("tbody")[0];
    
    
    
}


// first step grab th elements and add event listener 
// second step check which tag is clicked and what is its index
// then loop through corresponding index in td elements and then apply method on those by adding them first in an array and then method on that array
// simaltenously display that arranged array in td format and its corresponding data


// filter function will grab what item has to be filtered through input 
// it goes through data by accessing element with tag name accordingly in the same index in overall data
// and then it check in that index whether it is present and if then display in the same order it finds out in the index


// const filterButton = document.getElementById("filter");
// filterButton.addEventListener("click",()=>{

// })
// function filter(){

// }