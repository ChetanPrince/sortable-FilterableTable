let selectedRow = null;

const btn = document.getElementById("submit");
btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let formData= getData();
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
    let savedData = JSON.parse(localStorage.getItem("studentRecord"))|| [];
    const updatedData = savedData.filter(data=>data.studentRollNo!== formDAta["studentRollNo"]);
    updatedData.push(formData);
    localStorage.setItem("studentRecord", JSON.stringify(updatedData));
    selectedRow = null;
}
function deleteRow(td){
    selectedRow = td.parentElement.parentElement;
    if(confirm("Are you sure you want to delete this record?")){
        selectedRow.remove();
    }
    let savedData = JSON.parse(localStorage.getItem("studentRecord"))||[];
    const updatedData = savedData.filter(data=>data.studentRollNo!==studentRollNo);
    localStorage.setITem("studentRecord", JSON.stringify(updatedData));
}