let selectedRow = null;



window.onload = loadData;

function loadData(){
    const savedData = JSON.parse(localStorage.getItem("studentRecord"))||[];
    const table = document.querySelector(".output tbody");
    savedData.forEach(data=>{
        const tr = document.createElement("tr");
         tr.innerHTML = `<td>${data.studentName}</td><td>${data.studentRollNo}</td><td>${data.studentRanking}</td><td>${data.studentGrade}</td><td>${data.studentAttendance}</td><td>${data.studentMarks}</td><td><button id="edit" onClick="edit(this)">Edit</button></td><td><button id="delete" onClick="deleteRow(this)">Delete</button></td>`;
         table.appendChild(tr);
    })
}

const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData= getData();
    const inputs = document.querySelectorAll(".container input");
    let allFieldsFilled = true;
    inputs.forEach(input=>{
        if(input.value.trim()===""){
            allFieldsFilled = false;
        }    })

        if(!allFieldsFilled){
            alert("Kindly Fill The Required Fields");
        }
    if(selectedRow === null){
        saveData(formData);
    }else{
        updateData(formData);
    }
    clearData();

});

function getData(){
    return{
        studentName: document.getElementById("studentName").value,
        studentRollNo: document.getElementById("studentRollNo").value,
        studentRanking: document.getElementById("studentRanking").value,
        studentGrade: document.getElementById("studentGrade").value,
        studentAttendance: document.getElementById("studentAttendance").value,
        studentMarks: document.getElementById("studentMarks").value
    }
}
function saveData(formData){
    const table = document.querySelector(".output tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${formData.studentName}</td><td>${formData.studentRollNo}</td><td>${formData.studentRanking}</td><td>${formData.studentGrade}</td><td>${formData.studentAttendance}</td><td>${formData.studentMarks}</td><td><button id="edit" onClick="edit(this)">Edit</button></td><td><button id="delete" onClick="deleteRow(this)">Delete</button></td>`;
    table.appendChild(tr);
    let savedData = JSON.parse(localStorage.getItem("studentRecord"))||[];
    savedData.push(formData);
    localStorage.setItem("studentRecord", JSON.stringify(savedData));

}

function clearData(){
    document.getElementById("studentName").value="";
    document.getElementById("studentRollNo").value="";
    document.getElementById("studentRanking").value="";
    document.getElementById("studentGrade").value="";
    document.getElementById("studentAttendance").value="";
    document.getElementById("studentMarks").value="";
}
function edit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentName").value= selectedRow.cells[0].innerHTML;
    document.getElementById("studentRollNo").value=selectedRow.cells[1].innerHTML;
    document.getElementById("studentRanking").value=selectedRow.cells[2].innerHTML;
    document.getElementById("studentGrade").value=selectedRow.cells[3].innerHTML;
    document.getElementById("studentAttendance").value=selectedRow.cells[4].innerHTML;
    document.getElementById("studentMarks").value=selectedRow.cells[5].innerHTML;
    

}
function updateData(formData){
    console.log(formData.studentName)
    selectedRow.cells[0].innerHTML = formData.studentName;
    selectedRow.cells[1].innerHTML = formData.studentRollNo;
    selectedRow.cells[2].innerHTML = formData.studentRanking;
    selectedRow.cells[3].innerHTML = formData.studentGrade;
    selectedRow.cells[4].innerHTML = formData.studentAttendance;
    selectedRow.cells[5].innerHTML = formData.studentMarks;

    //  savedData idenfies if there is any existing record in local storage and then if it is not present in the system then a new empty array is placed
    let savedData = JSON.parse(localStorage.getItem("studentRecord"))|| [];
    // updatedData filters the data for the specific row to update only the selected row and not the others data by checking what not is the roll no matching to current data 
    const updatedData = savedData.filter(data=>data.studentRollNo!== formData["studentRollNo"]);
    // then data leaves the filtered data and updates the selected row line
    updatedData.push(formData);
    // then localstorage sets items in the file by stringifying data into string and catches data from updatedData and saves in local storage
    localStorage.setItem("studentRecord", JSON.stringify(updatedData));
    selectedRow = null;
}
function deleteRow(td){
    selectedRow = td.parentElement.parentElement;
    const rollNoToDelete = selectedRow.cells[1].innerHTML;
    if(confirm("Are you sure you want to delete this record?")){
        selectedRow.remove();
    }
    let savedData = JSON.parse(localStorage.getItem("studentRecord"))||[];
    const updatedData = savedData.filter(data=>data.studentRollNo!==rollNoToDelete);
    localStorage.setItem("studentRecord", JSON.stringify(updatedData));
}


document.querySelectorAll("th").forEach((th, index)=>{
    th.addEventListener("click", ()=>sort(index));
})


// sort function
// table variable
// row array
// isAscending data attribute
// rows sort with row a and row b
// inside sort cell of rowcolumnindex text trim
// if is a number then minus
// if is not a number then locale compare
// outside sort table innerhtml blank set
// rows each is appended intable
// set attribute is set if is ascending to desc or asc
// header variable selected th
// then for each header innerHTML reokace arrows
// headers colIndex innerhtml is added with a ternary operator of is Ascending

function sort(columnIndex){
    let table = document.querySelector(".output tbody");
    let rows = Array.from(table.rows);
    let isAscending  =  table.getAttribute("data-sort-order") === "asc";
    rows.sort((rowA, rowB)=>{
        let cellA = rowA.cells[columnIndex].innerText.trim();
        let cellB = rowB.cells[columnIndex].innerText.trim();
        if(!isNaN(cellA)&&!isNaN(cellB)){
            return isAscending? cellA-cellB : cellB-cellA
        }return isAscending? cellA.localeCompare(cellB):cellB.localeCompare(cellA);
    });
    table.innerHTML = "";
    table.setAttribute("data-sort-order", isAscending? "desc":"ascd");
    let headers = document.querySelectorAll(".output tbody th");
    headers.forEach((header)=>{
        header.innerHTML = header.innerHTML.replace("/↓|↑/")
    })

}