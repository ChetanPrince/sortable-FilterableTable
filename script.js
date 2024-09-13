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

    
    if (!allFieldsFilled) {
        alert("Kindly fill in all the required fields.");
        return; //
    }
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formData.name}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td><button onclick="edit(this)">Edit</button></td><td><button onclick="deleteRow(this, '${formData.studentRollNo}')">Delete</button></td>`;
    table.appendChild(tr);


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
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value = selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value = selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value = selectedRow.cells[3].innerHTML;
}
window.onload = loadData;

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